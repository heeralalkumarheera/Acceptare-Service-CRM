const Lead = require("../models/Lead.model");
const { notifyLeadAssignment } = require("../utils/notification.service");
const User = require("../models/User.model");

// CREATE LEAD
const createLead = async (req, res, next) => {
  try {
    const lead = await Lead.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

// GET LEAD BY ID
const getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate("assignedTo", "name email role")
      .populate("createdBy", "name email");

    if (!lead) {
      throw { statusCode: 404, message: "Lead not found" };
    }

    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

// GET ALL LEADS
const getAllLeads = async (req, res, next) => {
  try {
    const leads = await Lead.find()
      .populate("assignedTo", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: leads });
  } catch (error) {
    next(error);
  }
};

// UPDATE LEAD
const updateLead = async (req, res, next) => {
  try {
    const oldLead = await Lead.findById(req.params.id);

    if (!oldLead) {
      throw { statusCode: 404, message: "Lead not found" };
    }

    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("assignedTo", "name email");

    // Send notification if lead is reassigned
    if (req.body.assignedTo && req.body.assignedTo !== oldLead.assignedTo?.toString()) {
      const assignedUser = await User.findById(req.body.assignedTo);
      if (assignedUser) {
        await notifyLeadAssignment(lead, assignedUser);
      }
    }

    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE LEAD
const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      throw { statusCode: 404, message: "Lead not found" };
    }

    res.status(200).json({ success: true, message: "Lead deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createLead, getAllLeads, updateLead, deleteLead };

// UPDATE LEAD STAGE (Sales Stage Logic - Komal Day 5-6)
const updateLeadStage = async (req, res, next) => {
  try {
    const { stage } = req.body;

    const validStages = ["new", "contacted", "qualified", "proposal", "won", "lost"];
    if (!validStages.includes(stage)) {
      throw { statusCode: 400, message: "Invalid stage value" };
    }

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      throw { statusCode: 404, message: "Lead not found" };
    }

    // Stage transition logic
    const stageOrder = {
      new: 0,
      contacted: 1,
      qualified: 2,
      proposal: 3,
      won: 4,
      lost: 4,
    };

    // Allow moving forward or to won/lost
    if (
      stage === "won" ||
      stage === "lost" ||
      stageOrder[stage] >= stageOrder[lead.stage]
    ) {
      lead.stage = stage;
      await lead.save();

      res.status(200).json({
        success: true,
        message: `Lead stage updated to ${stage}`,
        data: lead,
      });
    } else {
      throw { statusCode: 400, message: "Cannot move lead backward in sales pipeline" };
    }
  } catch (error) {
    next(error);
  }
};

// GET LEADS BY STAGE
const getLeadsByStage = async (req, res, next) => {
  try {
    const { stage } = req.params;

    const leads = await Lead.find({ stage })
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: leads,
      count: leads.length,
    });
  } catch (error) {
    next(error);
  }
};

// GET LEAD PIPELINE SUMMARY
const getLeadPipeline = async (req, res, next) => {
  try {
    const pipeline = await Lead.aggregate([
      {
        $group: {
          _id: "$stage",
          count: { $sum: 1 },
          totalRevenue: { $sum: "$expectedRevenue" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: pipeline,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
  updateLeadStage,
  getLeadsByStage,
  getLeadPipeline,
};
