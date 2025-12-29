const Amc = require("../models/Amc.model");

// CREATE AMC
const createAmc = async (req, res) => {
  try {
    const amc = await Amc.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "AMC created successfully",
      data: amc,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL AMCs
const getAllAmcs = async (req, res) => {
  try {
    const amcs = await Amc.find()
      .populate("client", "companyName email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: amcs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE AMC STATUS (expiry handling)
const updateAmcStatus = async (req, res) => {
  try {
    const amc = await Amc.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!amc) {
      return res
        .status(404)
        .json({ success: false, message: "AMC not found" });
    }

    res.status(200).json({
      success: true,
      message: "AMC status updated",
      data: amc,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createAmc, getAllAmcs, updateAmcStatus };
