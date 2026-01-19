const express = require("express");
const router = express.Router();
const { validate, taskValidation } = require("../middlewares/validation.middleware");

const {
  createTask,
  getAllTasks,
  getMyTasks,
  getTaskById,
  updateTask,
  markTaskCompleted,
  deleteTask,
  getOverdueTasks,
  getTodayTasks,
} = require("../controllers/task.controller");

const { protect, authorizeRoles } = require("../middlewares/auth.middleware");

// CREATE TASK
router.post("/", protect, validate(taskValidation), createTask);

// GET ALL TASKS
router.get("/", protect, getAllTasks);

// GET MY TASKS
router.get("/my", protect, getMyTasks);

// GET OVERDUE TASKS
router.get("/overdue", protect, getOverdueTasks);

// GET TODAY'S TASKS
router.get("/today", protect, getTodayTasks);

// GET TASK BY ID
router.get("/:id", protect, getTaskById);

// UPDATE TASK
router.put("/:id", protect, updateTask);

// MARK TASK AS COMPLETED
router.patch("/:id/complete", protect, markTaskCompleted);

// DELETE TASK
router.delete("/:id", protect, authorizeRoles("admin"), deleteTask);

module.exports = router;
