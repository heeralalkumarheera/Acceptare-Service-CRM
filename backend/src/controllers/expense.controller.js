const Expense = require("../models/Expense.model");

// CREATE EXPENSE
const createExpense = async (req, res) => {
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
    res.status(500).json({ success: false, message: error.message });
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

module.exports = {
  createExpense,
  getAllExpenses,
};
