const Client = require("../models/Client.model");
const Lead = require("../models/Lead.model");
const Expense = require("../models/Expense.model");
const Invoice = require("../models/Invoice.model");
const FollowUp = require("../models/FollowUp.model");

// DASHBOARD SUMMARY
const getDashboardSummary = async (req, res) => {
  try {
    const totalClients = await Client.countDocuments();
    const totalLeads = await Lead.countDocuments();
    const totalExpensesAgg = await Expense.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalInvoicesAgg = await Invoice.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const pendingFollowUps = await FollowUp.countDocuments({
      status: "pending",
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const overdueFollowUps = await FollowUp.countDocuments({
      status: "pending",
      nextFollowUpDate: { $lt: today },
    });

    res.status(200).json({
      success: true,
      data: {
        totalClients,
        totalLeads,
        totalExpenses: totalExpensesAgg[0]?.total || 0,
        totalInvoiceAmount: totalInvoicesAgg[0]?.total || 0,
        pendingFollowUps,
        overdueFollowUps,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getDashboardSummary };
