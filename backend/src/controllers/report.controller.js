const Lead = require("../models/Lead.model");
const Client = require("../models/Client.model");
const Invoice = require("../models/Invoice.model");
const Expense = require("../models/Expense.model");
const Task = require("../models/Task.model");
const CallLog = require("../models/CallLog.model");
const FollowUp = require("../models/FollowUp.model");
const { successResponse } = require("../utils/response");

// COMPREHENSIVE SALES REPORT
const getSalesReport = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const dateFilter = {};
    if (startDate && endDate) {
      dateFilter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Total revenue
    const revenueData = await Invoice.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
          paidRevenue: {
            $sum: {
              $cond: [{ $eq: ["$paymentStatus", "paid"] }, "$totalAmount", 0],
            },
          },
          pendingRevenue: {
            $sum: {
              $cond: [
                { $eq: ["$paymentStatus", "pending"] },
                "$totalAmount",
                0,
              ],
            },
          },
        },
      },
    ]);

    // Leads conversion
    const totalLeads = await Lead.countDocuments(dateFilter);
    const convertedLeads = await Lead.countDocuments({
      ...dateFilter,
      stage: "won",
    });

    // Monthly breakdown
    const monthlyRevenue = await Invoice.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
          revenue: { $sum: "$totalAmount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    successResponse(res, "Sales report generated successfully", {
      summary: {
        totalRevenue: revenueData[0]?.totalRevenue || 0,
        paidRevenue: revenueData[0]?.paidRevenue || 0,
        pendingRevenue: revenueData[0]?.pendingRevenue || 0,
        totalLeads,
        convertedLeads,
        conversionRate:
          totalLeads > 0
            ? ((convertedLeads / totalLeads) * 100).toFixed(2)
            : 0,
      },
      monthlyRevenue,
    });
  } catch (error) {
    next(error);
  }
};

// EXPENSE REPORT
const getExpenseReport = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const dateFilter = {};
    if (startDate && endDate) {
      dateFilter.expenseDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const totalExpenses = await Expense.aggregate([
      { $match: dateFilter },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const categoryWise = await Expense.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
    ]);

    const monthlyExpenses = await Expense.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: {
            month: { $month: "$expenseDate" },
            year: { $year: "$expenseDate" },
          },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    successResponse(res, "Expense report generated successfully", {
      totalExpenses: totalExpenses[0]?.total || 0,
      categoryWise,
      monthlyExpenses,
    });
  } catch (error) {
    next(error);
  }
};

// LEAD PERFORMANCE REPORT
const getLeadPerformanceReport = async (req, res, next) => {
  try {
    const leadsByStage = await Lead.aggregate([
      { $group: { _id: "$stage", count: { $sum: 1 } } },
    ]);

    const leadsBySource = await Lead.aggregate([
      { $group: { _id: "$source", count: { $sum: 1 } } },
    ]);

    const leadsByAssignee = await Lead.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "assignedTo",
          foreignField: "_id",
          as: "assignee",
        },
      },
      { $unwind: { path: "$assignee", preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: "$assignee.name",
          totalLeads: { $sum: 1 },
          wonLeads: {
            $sum: { $cond: [{ $eq: ["$stage", "won"] }, 1, 0] },
          },
          totalRevenue: { $sum: "$expectedRevenue" },
        },
      },
    ]);

    successResponse(res, "Lead performance report generated", {
      leadsByStage,
      leadsBySource,
      leadsByAssignee,
    });
  } catch (error) {
    next(error);
  }
};

// TASK PERFORMANCE REPORT
const getTaskPerformanceReport = async (req, res, next) => {
  try {
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ status: "completed" });
    const overdueTasks = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $in: ["pending", "in-progress"] },
    });

    const tasksByStatus = await Task.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const tasksByPriority = await Task.aggregate([
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]);

    const tasksByAssignee = await Task.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "assignedTo",
          foreignField: "_id",
          as: "assignee",
        },
      },
      { $unwind: "$assignee" },
      {
        $group: {
          _id: "$assignee.name",
          totalTasks: { $sum: 1 },
          completedTasks: {
            $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
          },
        },
      },
    ]);

    successResponse(res, "Task performance report generated", {
      summary: {
        totalTasks,
        completedTasks,
        overdueTasks,
        completionRate:
          totalTasks > 0
            ? ((completedTasks / totalTasks) * 100).toFixed(2)
            : 0,
      },
      tasksByStatus,
      tasksByPriority,
      tasksByAssignee,
    });
  } catch (error) {
    next(error);
  }
};

// CALL LOG REPORT
const getCallLogReport = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const dateFilter = {};
    if (startDate && endDate) {
      dateFilter.callDateTime = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const totalCalls = await CallLog.countDocuments(dateFilter);

    const callsByType = await CallLog.aggregate([
      { $match: dateFilter },
      { $group: { _id: "$callType", count: { $sum: 1 } } },
    ]);

    const callsByStatus = await CallLog.aggregate([
      { $match: dateFilter },
      { $group: { _id: "$callStatus", count: { $sum: 1 } } },
    ]);

    const callsByOutcome = await CallLog.aggregate([
      { $match: dateFilter },
      { $group: { _id: "$outcome", count: { $sum: 1 } } },
    ]);

    const avgCallDuration = await CallLog.aggregate([
      { $match: { ...dateFilter, callStatus: "completed" } },
      { $group: { _id: null, avgDuration: { $avg: "$duration" } } },
    ]);

    successResponse(res, "Call log report generated", {
      totalCalls,
      averageDuration: avgCallDuration[0]?.avgDuration || 0,
      callsByType,
      callsByStatus,
      callsByOutcome,
    });
  } catch (error) {
    next(error);
  }
};

// CLIENT REPORT
const getClientReport = async (req, res, next) => {
  try {
    const totalClients = await Client.countDocuments();
    const activeClients = await Client.countDocuments({ status: "active" });
    const inactiveClients = await Client.countDocuments({ status: "inactive" });

    const clientsWithRevenue = await Invoice.aggregate([
      {
        $lookup: {
          from: "clients",
          localField: "client",
          foreignField: "_id",
          as: "clientData",
        },
      },
      { $unwind: "$clientData" },
      {
        $group: {
          _id: "$client",
          companyName: { $first: "$clientData.companyName" },
          totalRevenue: { $sum: "$totalAmount" },
          invoiceCount: { $sum: 1 },
        },
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: 10 },
    ]);

    successResponse(res, "Client report generated", {
      summary: {
        totalClients,
        activeClients,
        inactiveClients,
      },
      topClients: clientsWithRevenue,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSalesReport,
  getExpenseReport,
  getLeadPerformanceReport,
  getTaskPerformanceReport,
  getCallLogReport,
  getClientReport,
};
