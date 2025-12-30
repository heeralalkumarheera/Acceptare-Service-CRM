const express = require("express");
const router = express.Router();

const {
  createExpense,
  getAllExpenses,
} = require("../controllers/expense.controller");

const { protect } = require("../middlewares/auth.middleware");

// CREATE EXPENSE
router.post("/", protect, createExpense);

// GET ALL EXPENSES
router.get("/", protect, getAllExpenses);

module.exports = router;
