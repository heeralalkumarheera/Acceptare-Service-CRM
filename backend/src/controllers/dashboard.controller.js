const Client = require("../models/Client.model");
const Lead = require("../models/Lead.model");
const FollowUp = require("../models/FollowUp.model");
const Invoice = require("../models/Invoice.model");
const Expense = require("../models/Expense.model");

// Helper: month labels
const monthLabels = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];


// ===============================
// 🔥 DASHBOARD SUMMARY (CARDS)
// ===============================
const getDashboardSummary = async (req, res, next) => {
  try {
    const totalClients = await Client.countDocuments({ status: "active" });
    const totalLeads = await Lead.countDocuments();

    const totalExpensesAgg = await Expense.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalInvoicesAgg = await Invoice.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const paidInvoicesAgg = await Invoice.aggregate([
      { $match: { paymentStatus: "paid" } },
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

    const leadsByStage = await Lead.aggregate([
      { $group: { _id: "$stage", count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalClients,
          totalLeads,
          totalExpenses: totalExpensesAgg[0]?.total || 0,
          totalInvoiceAmount: totalInvoicesAgg[0]?.total || 0,
          paidInvoiceAmount: paidInvoicesAgg[0]?.total || 0,
          pendingFollowUps,
          overdueFollowUps,
        },
        leadsByStage,
      },
    });
  } catch (error) {
    next(error);
  }
};


// ===============================
// 🔥 MONTHLY SALES (INVOICE) TREND
// ===============================
const getMonthlySalesTrend = async (req, res, next) => {
  try {
    const data = await Invoice.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$totalAmount" },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    const result = monthLabels.map((m, i) => {
      const found = data.find(d => d._id === i + 1);
      return { month: m, value: found ? found.total : 0 };
    });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};


// ===============================
// 🔥 MONTHLY EXPENSE TREND
// ===============================
const getMonthlyExpenseTrend = async (req, res, next) => {
  try {
    const data = await Expense.aggregate([
      {
        $group: {
          _id: { $month: "$expenseDate" },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    const result = monthLabels.map((m, i) => {
      const found = data.find(d => d._id === i + 1);
      return { month: m, value: found ? found.total : 0 };
    });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};


// ===============================
// 🔥 SALES VS EXPENSE (MONTHLY)
// ===============================
const getSalesVsExpense = async (req, res, next) => {
  try {
    const sales = await Invoice.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$totalAmount" },
        },
      },
    ]);

    const expenses = await Expense.aggregate([
      {
        $group: {
          _id: { $month: "$expenseDate" },
          total: { $sum: "$amount" },
        },
      },
    ]);

    const result = monthLabels.map((m, i) => {
      const s = sales.find(d => d._id === i + 1);
      const e = expenses.find(d => d._id === i + 1);
      return {
        month: m,
        sales: s ? s.total : 0,
        expense: e ? e.total : 0,
      };
    });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getDashboardSummary,
  getMonthlySalesTrend,
  getMonthlyExpenseTrend,
  getSalesVsExpense,
};
