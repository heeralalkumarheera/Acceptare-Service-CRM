const Task = require("../models/Task.model");
const FollowUp = require("../models/FollowUp.model");
const { successResponse } = require("../utils/response");

// GET CALENDAR EVENTS (Tasks + Follow-ups)
const getCalendarEvents = async (req, res, next) => {
  try {
    const { startDate, endDate, userId } = req.query;

    const dateFilter = {};
    if (startDate && endDate) {
      dateFilter.$gte = new Date(startDate);
      dateFilter.$lte = new Date(endDate);
    }

    const userFilter = userId ? { assignedTo: userId } : {};

    // Get tasks
    const tasks = await Task.find({
      ...userFilter,
      dueDate: dateFilter,
    })
      .populate("assignedTo", "name email")
      .populate("category", "name color")
      .lean();

    // Get follow-ups
    const followUps = await FollowUp.find({
      ...userFilter,
      nextFollowUpDate: dateFilter,
    })
      .populate("assignedTo", "name email")
      .lean();

    // Format events for calendar
    const events = [
      ...tasks.map((task) => ({
        id: task._id,
        title: task.title,
        type: "task",
        date: task.dueDate,
        priority: task.priority,
        status: task.status,
        assignedTo: task.assignedTo,
        color: task.category?.color || "#6366F1",
      })),
      ...followUps.map((followUp) => ({
        id: followUp._id,
        title: followUp.note,
        type: "followup",
        date: followUp.nextFollowUpDate,
        status: followUp.status,
        assignedTo: followUp.assignedTo,
        color: "#EF4444",
      })),
    ];

    // Sort by date
    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    successResponse(res, "Calendar events retrieved successfully", events);
  } catch (error) {
    next(error);
  }
};

// GET EVENTS FOR SPECIFIC DATE
const getEventsByDate = async (req, res, next) => {
  try {
    const { date } = req.query;

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(targetDate);
    nextDay.setDate(targetDate.getDate() + 1);

    const tasks = await Task.find({
      dueDate: { $gte: targetDate, $lt: nextDay },
    })
      .populate("assignedTo", "name email")
      .populate("category", "name color");

    const followUps = await FollowUp.find({
      nextFollowUpDate: { $gte: targetDate, $lt: nextDay },
    }).populate("assignedTo", "name email");

    const events = {
      tasks,
      followUps,
      total: tasks.length + followUps.length,
    };

    successResponse(res, "Events retrieved successfully", events);
  } catch (error) {
    next(error);
  }
};

// GET MY CALENDAR (Logged-in user's events)
const getMyCalendar = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const dateFilter = {};
    if (startDate && endDate) {
      dateFilter.$gte = new Date(startDate);
      dateFilter.$lte = new Date(endDate);
    }

    const tasks = await Task.find({
      assignedTo: req.user._id,
      dueDate: dateFilter,
    })
      .populate("category", "name color")
      .lean();

    const followUps = await FollowUp.find({
      assignedTo: req.user._id,
      nextFollowUpDate: dateFilter,
    }).lean();

    const events = [
      ...tasks.map((task) => ({
        id: task._id,
        title: task.title,
        type: "task",
        date: task.dueDate,
        priority: task.priority,
        status: task.status,
        color: task.category?.color || "#6366F1",
      })),
      ...followUps.map((followUp) => ({
        id: followUp._id,
        title: followUp.note,
        type: "followup",
        date: followUp.nextFollowUpDate,
        status: followUp.status,
        color: "#EF4444",
      })),
    ];

    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    successResponse(res, "My calendar retrieved successfully", events);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCalendarEvents,
  getEventsByDate,
  getMyCalendar,
};
