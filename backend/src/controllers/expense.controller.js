const Expense = require("../models/Expense.model");

// CREATE EXPENSE
const createExpense = async (req, res, next) => {
  try {
    const expense = await Expense.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Expense created successfully",
      data: expense,
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL EXPENSES
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find()
      .populate("createdBy", "name email")
      .sort({ expenseDate: -1 });

    res.status(200).json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔥 MONTHLY EXPENSE REPORT
const getMonthlyExpenseReport = async (req, res) => {
  try {
    const report = await Expense.aggregate([
      {
        $group: {
          _id: { month: { $month: "$expenseDate" } },
          totalAmount: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔥 CATEGORY-WISE EXPENSE REPORT
const getCategoryExpenseReport = async (req, res) => {
  try {
    const report = await Expense.aggregate([
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔥 DATE RANGE EXPENSE REPORT
const getExpenseByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const expenses = await Expense.find({
      expenseDate: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });

    res.status(200).json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createExpense,
  getAllExpenses,
  getMonthlyExpenseReport,
  getCategoryExpenseReport,
  getExpenseByDateRange,
};
