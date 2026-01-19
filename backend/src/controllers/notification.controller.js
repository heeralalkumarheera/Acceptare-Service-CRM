const Notification = require("../models/Notification.model");
const { successResponse } = require("../utils/response");

// CREATE NOTIFICATION
const createNotification = async (req, res, next) => {
  try {
    const notification = await Notification.create(req.body);

    successResponse(res, "Notification created successfully", notification, 201);
  } catch (error) {
    next(error);
  }
};

// GET ALL NOTIFICATIONS FOR LOGGED-IN USER
const getMyNotifications = async (req, res, next) => {
  try {
    const { isRead } = req.query;

    const filter = { recipient: req.user._id };
    if (isRead !== undefined) {
      filter.isRead = isRead === "true";
    }

    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .limit(50);

    const unreadCount = await Notification.countDocuments({
      recipient: req.user._id,
      isRead: false,
    });

    successResponse(res, "Notifications retrieved successfully", {
      notifications,
      unreadCount,
    });
  } catch (error) {
    next(error);
  }
};

// MARK NOTIFICATION AS READ
const markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        isRead: true,
        readAt: new Date(),
      },
      { new: true }
    );

    if (!notification) {
      throw { statusCode: 404, message: "Notification not found" };
    }

    successResponse(res, "Notification marked as read", notification);
  } catch (error) {
    next(error);
  }
};

// MARK ALL NOTIFICATIONS AS READ
const markAllAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { recipient: req.user._id, isRead: false },
      { isRead: true, readAt: new Date() }
    );

    successResponse(res, "All notifications marked as read", null);
  } catch (error) {
    next(error);
  }
};

// DELETE NOTIFICATION
const deleteNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      recipient: req.user._id,
    });

    if (!notification) {
      throw { statusCode: 404, message: "Notification not found" };
    }

    successResponse(res, "Notification deleted successfully", null);
  } catch (error) {
    next(error);
  }
};

// CLEAR ALL READ NOTIFICATIONS
const clearReadNotifications = async (req, res, next) => {
  try {
    await Notification.deleteMany({
      recipient: req.user._id,
      isRead: true,
    });

    successResponse(res, "Read notifications cleared successfully", null);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNotification,
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearReadNotifications,
};
