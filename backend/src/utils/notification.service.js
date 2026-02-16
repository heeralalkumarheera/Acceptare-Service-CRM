const Notification = require("../models/Notification.model");

/**
 * Create a notification for a user
 * @param {Object} data - Notification data
 * @param {String} data.recipient - User ID
 * @param {String} data.title - Notification title
 * @param {String} data.message - Notification message
 * @param {String} data.type - Notification type
 * @param {String} data.priority - Priority level
 * @param {String} data.relatedTo - Related model name
 * @param {String} data.relatedId - Related model ID
 */
const createNotification = async (data) => {
  try {
    const notification = await Notification.create(data);
    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
    return null;
  }
};

/**
 * Create follow-up reminder notification
 */
const notifyFollowUpReminder = async (followUp, user) => {
  await createNotification({
    recipient: user._id,
    title: "Follow-up Reminder",
    message: `You have a follow-up scheduled: ${followUp.note}`,
    type: "followup",
    priority: "high",
    relatedTo: "FollowUp",
    relatedId: followUp._id,
  });
};

/**
 * Create lead assignment notification
 */
const notifyLeadAssignment = async (lead, assignedUser) => {
  await createNotification({
    recipient: assignedUser._id,
    title: "New Lead Assigned",
    message: `A new lead "${lead.name}" has been assigned to you`,
    type: "lead",
    priority: "medium",
    relatedTo: "Lead",
    relatedId: lead._id,
  });
};

/**
 * Create invoice payment notification
 */
const notifyPaymentReceived = async (invoice, user) => {
  await createNotification({
    recipient: user._id,
    title: "Payment Received",
    message: `Payment received for Invoice #${invoice.invoiceNumber}`,
    type: "payment",
    priority: "medium",
    relatedTo: "Invoice",
    relatedId: invoice._id,
  });
};

/**
 * Create AMC renewal reminder
 */
const notifyAmcRenewal = async (amc, user) => {
  await createNotification({
    recipient: user._id,
    title: "AMC Renewal Reminder",
    message: `AMC for ${amc.client?.companyName || "client"} is expiring soon`,
    type: "amc-renewal",
    priority: "high",
    relatedTo: "Amc",
    relatedId: amc._id,
  });
};

/**
 * Create task assignment notification
 */
const notifyTaskAssignment = async (task, assignedUser) => {
  await createNotification({
    recipient: assignedUser._id,
    title: "New Task Assigned",
    message: `A new task "${task.title}" has been assigned to you`,
    type: "task",
    priority: task.priority,
    relatedTo: "Task",
    relatedId: task._id,
  });
};

/**
 * Create overdue task notification
 */
const notifyOverdueTask = async (task, user) => {
  await createNotification({
    recipient: user._id,
    title: "Task Overdue",
    message: `Task "${task.title}" is overdue`,
    type: "task",
    priority: "urgent",
    relatedTo: "Task",
    relatedId: task._id,
  });
};

module.exports = {
  createNotification,
  notifyFollowUpReminder,
  notifyLeadAssignment,
  notifyPaymentReceived,
  notifyAmcRenewal,
  notifyTaskAssignment,
  notifyOverdueTask,
};
