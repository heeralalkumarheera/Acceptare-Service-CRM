const express = require("express");
const router = express.Router();

const {
  createExpense,
  getAllExpenses,
  getMonthlyExpenseReport,
  getCategoryExpenseReport,
  getExpenseByDateRange,
} = require("../controllers/expense.controller");

const { protect } = require("../middlewares/auth.middleware");

// CREATE EXPENSE
router.post("/", protect, createExpense);

// GET ALL EXPENSES
router.get("/", protect, getAllExpenses);

// REPORTS
router.get("/report/monthly", protect, getMonthlyExpenseReport);
router.get("/report/category", protect, getCategoryExpenseReport);
router.get("/report/date-range", protect, getExpenseByDateRange);

module.exports = router;
