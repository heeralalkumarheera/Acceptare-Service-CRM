const AutomationRule = require("../models/AutomationRule.model");
const Lead = require("../models/Lead.model");
const FollowUp = require("../models/FollowUp.model");

// CREATE RULE
const createRule = async (req, res) => {
  try {
    const rule = await AutomationRule.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Automation rule created",
      data: rule,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL RULES
const getAllRules = async (req, res) => {
  try {
    const rules = await AutomationRule.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: rules });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔥 MANUAL RULE EXECUTION (PART 1)
const runRules = async (req, res) => {
  try {
    const rules = await AutomationRule.find({ isActive: true });
    const today = new Date();

    let executed = [];

    for (let rule of rules) {
      // LEAD INACTIVITY RULE
      if (rule.module === "Lead") {
        const inactiveLeads = await Lead.find({
          updatedAt: {
            $lt: new Date(
              today.getTime() - rule.thresholdDays * 24 * 60 * 60 * 1000
            ),
          },
        });

        executed.push({
          rule: rule.name,
          affectedRecords: inactiveLeads.length,
        });
      }

      // FOLLOW-UP OVERDUE RULE
      if (rule.module === "FollowUp") {
        const overdueFollowUps = await FollowUp.find({
          status: "pending",
          nextFollowUpDate: { $lt: today },
        });

        executed.push({
          rule: rule.name,
          affectedRecords: overdueFollowUps.length,
        });
      }
    }

    res.status(200).json({
      success: true,
      message: "Automation rules evaluated",
      data: executed,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createRule,
  getAllRules,
  runRules,
};
