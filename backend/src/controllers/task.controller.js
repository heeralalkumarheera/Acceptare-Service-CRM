const Task = require("../models/Task.model");
const { successResponse } = require("../utils/response");

// CREATE TASK
const createTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      ...req.body,
      createdBy: req.user._id,
    });

    successResponse(res, "Task created successfully", task, 201);
  } catch (error) {
    next(error);
  }
};

// GET ALL TASKS
const getAllTasks = async (req, res, next) => {
  try {
    const { status, priority, assignedTo } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (assignedTo) filter.assignedTo = assignedTo;

    const tasks = await Task.find(filter)
      .populate("assignedTo", "name email")
      .populate("category", "name color")
      .populate("createdBy", "name email")
      .sort({ dueDate: 1 });

    successResponse(res, "Tasks retrieved successfully", tasks);
  } catch (error) {
    next(error);
  }
};

// GET MY TASKS (Logged-in user's tasks)
const getMyTasks = async (req, res, next) => {
  try {
    const { status } = req.query;

    const filter = { assignedTo: req.user._id };
    if (status) filter.status = status;

    const tasks = await Task.find(filter)
      .populate("category", "name color")
      .populate("createdBy", "name email")
      .sort({ dueDate: 1 });

    successResponse(res, "My tasks retrieved successfully", tasks);
  } catch (error) {
    next(error);
  }
};

// GET TASK BY ID
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("category", "name color")
      .populate("createdBy", "name email");

    if (!task) {
      throw { statusCode: 404, message: "Task not found" };
    }

    successResponse(res, "Task retrieved successfully", task);
  } catch (error) {
    next(error);
  }
};

// UPDATE TASK
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate("assignedTo", "name email")
      .populate("category", "name color");

    if (!task) {
      throw { statusCode: 404, message: "Task not found" };
    }

    successResponse(res, "Task updated successfully", task);
  } catch (error) {
    next(error);
  }
};

// MARK TASK AS COMPLETED
const markTaskCompleted = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        status: "completed",
        completedAt: new Date(),
      },
      { new: true }
    ).populate("assignedTo", "name email");

    if (!task) {
      throw { statusCode: 404, message: "Task not found" };
    }

    successResponse(res, "Task marked as completed", task);
  } catch (error) {
    next(error);
  }
};

// DELETE TASK
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      throw { statusCode: 404, message: "Task not found" };
    }

    successResponse(res, "Task deleted successfully", null);
  } catch (error) {
    next(error);
  }
};

// GET OVERDUE TASKS
const getOverdueTasks = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tasks = await Task.find({
      dueDate: { $lt: today },
      status: { $in: ["pending", "in-progress"] },
    })
      .populate("assignedTo", "name email")
      .populate("category", "name color")
      .sort({ dueDate: 1 });

    successResponse(res, "Overdue tasks retrieved successfully", tasks);
  } catch (error) {
    next(error);
  }
};

// GET TODAY'S TASKS
const getTodayTasks = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const tasks = await Task.find({
      dueDate: { $gte: today, $lt: tomorrow },
    })
      .populate("assignedTo", "name email")
      .populate("category", "name color")
      .sort({ priority: -1 });

    successResponse(res, "Today's tasks retrieved successfully", tasks);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getMyTasks,
  getTaskById,
  updateTask,
  markTaskCompleted,
  deleteTask,
  getOverdueTasks,
  getTodayTasks,
};
