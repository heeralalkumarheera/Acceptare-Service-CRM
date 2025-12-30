const cron = require("node-cron");
const AutomationRule = require("../models/AutomationRule.model");
const Lead = require("../models/Lead.model");
const FollowUp = require("../models/FollowUp.model");

// 🔥 CORE AUTOMATION EXECUTOR
const executeAutomationRules = async () => {
  const rules = await AutomationRule.find({ isActive: true });
  const today = new Date();

  for (let rule of rules) {
    // LEAD INACTIVITY → MARK COLD
    if (rule.module === "Lead" && rule.action === "mark_cold") {
      const thresholdDate = new Date(
        today.getTime() - rule.thresholdDays * 24 * 60 * 60 * 1000
      );

      const leads = await Lead.find({
        updatedAt: { $lt: thresholdDate },
        status: { $ne: "cold" },
      });

      for (let lead of leads) {
        lead.status = "cold";
        await lead.save();
      }

      console.log(
        `🧠 Automation: ${leads.length} leads marked as cold`
      );
    }

    // FOLLOW-UP OVERDUE → AUTO ALERT (LOG)
    if (rule.module === "FollowUp" && rule.action === "alert_admin") {
      const overdue = await FollowUp.find({
        status: "pending",
        nextFollowUpDate: { $lt: today },
      });

      if (overdue.length > 0) {
        console.log(
          `⚠️ Automation Alert: ${overdue.length} overdue follow-ups found`
        );
      }
    }
  }
};

// 🔔 CRON JOB (DAILY AT 10 AM)
const startAutomationCron = () => {
  cron.schedule("0 10 * * *", async () => {
    console.log("🔁 Automation Rules Cron Running...");
    await executeAutomationRules();
  });
};

module.exports = { startAutomationCron, executeAutomationRules };
