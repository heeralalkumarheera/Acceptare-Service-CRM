const express = require("express");
const router = express.Router();

const {
  createNotification,
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearReadNotifications,
} = require("../controllers/notification.controller");

const { protect, authorizeRoles } = require("../middlewares/auth.middleware");

// CREATE NOTIFICATION (Admin only - system notifications)
router.post("/", protect, authorizeRoles("admin"), createNotification);

// GET MY NOTIFICATIONS
router.get("/my", protect, getMyNotifications);

// MARK AS READ
router.patch("/:id/read", protect, markAsRead);

// MARK ALL AS READ
router.patch("/read-all", protect, markAllAsRead);

// CLEAR READ NOTIFICATIONS
router.delete("/clear-read", protect, clearReadNotifications);

// DELETE NOTIFICATION
router.delete("/:id", protect, deleteNotification);

module.exports = router;
