const express = require("express");
const router = express.Router();

const {
  getCalendarEvents,
  getEventsByDate,
  getMyCalendar,
} = require("../controllers/calendar.controller");

const { protect } = require("../middlewares/auth.middleware");

// GET CALENDAR EVENTS
router.get("/events", protect, getCalendarEvents);

// GET EVENTS BY DATE
router.get("/events/date", protect, getEventsByDate);

// GET MY CALENDAR
router.get("/my", protect, getMyCalendar);

module.exports = router;
