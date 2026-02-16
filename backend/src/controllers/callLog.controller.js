const CallLog = require("../models/CallLog.model");
const Lead = require("../models/Lead.model");
const Client = require("../models/Client.model");
const { successResponse } = require("../utils/response");

// CREATE CALL LOG
const createCallLog = async (req, res, next) => {
  try {
    const callLog = await CallLog.create({
      ...req.body,
      recordedBy: req.user._id,
    });

    successResponse(res, "Call log created successfully", callLog, 201);
  } catch (error) {
    next(error);
  }
};

// GET ALL CALL LOGS
const getAllCallLogs = async (req, res, next) => {
  try {
    const { relatedTo, relatedId, callType, callStatus } = req.query;

    const filter = {};
    if (relatedTo) filter.relatedTo = relatedTo;
    if (relatedId) filter.relatedId = relatedId;
    if (callType) filter.callType = callType;
    if (callStatus) filter.callStatus = callStatus;

    const callLogs = await CallLog.find(filter)
      .populate("recordedBy", "name email")
      .populate("relatedId")
      .sort({ callDateTime: -1 });

    successResponse(res, "Call logs retrieved successfully", callLogs);
  } catch (error) {
    next(error);
  }
};

// GET CALL LOG BY ID
const getCallLogById = async (req, res, next) => {
  try {
    const callLog = await CallLog.findById(req.params.id)
      .populate("recordedBy", "name email")
      .populate("relatedId");

    if (!callLog) {
      throw { statusCode: 404, message: "Call log not found" };
    }

    successResponse(res, "Call log retrieved successfully", callLog);
  } catch (error) {
    next(error);
  }
};

// UPDATE CALL LOG
const updateCallLog = async (req, res, next) => {
  try {
    const callLog = await CallLog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("recordedBy", "name email");

    if (!callLog) {
      throw { statusCode: 404, message: "Call log not found" };
    }

    successResponse(res, "Call log updated successfully", callLog);
  } catch (error) {
    next(error);
  }
};

// DELETE CALL LOG
const deleteCallLog = async (req, res, next) => {
  try {
    const callLog = await CallLog.findByIdAndDelete(req.params.id);

    if (!callLog) {
      throw { statusCode: 404, message: "Call log not found" };
    }

    successResponse(res, "Call log deleted successfully", null);
  } catch (error) {
    next(error);
  }
};

// GET CALL LOGS BY LEAD OR CLIENT
const getCallLogsByEntity = async (req, res, next) => {
  try {
    const { entityType, entityId } = req.params;

    const callLogs = await CallLog.find({
      relatedTo: entityType,
      relatedId: entityId,
    })
      .populate("recordedBy", "name email")
      .sort({ callDateTime: -1 });

    successResponse(res, "Call logs retrieved successfully", callLogs);
  } catch (error) {
    next(error);
  }
};

// GET CALL STATISTICS
const getCallStatistics = async (req, res, next) => {
  try {
    const totalCalls = await CallLog.countDocuments();
    const completedCalls = await CallLog.countDocuments({ callStatus: "completed" });
    const missedCalls = await CallLog.countDocuments({ callStatus: "missed" });

    const avgDuration = await CallLog.aggregate([
      { $match: { callStatus: "completed" } },
      { $group: { _id: null, avgDuration: { $avg: "$duration" } } },
    ]);

    const callsByType = await CallLog.aggregate([
      { $group: { _id: "$callType", count: { $sum: 1 } } },
    ]);

    const callsByOutcome = await CallLog.aggregate([
      { $group: { _id: "$outcome", count: { $sum: 1 } } },
    ]);

    successResponse(res, "Call statistics retrieved successfully", {
      totalCalls,
      completedCalls,
      missedCalls,
      averageDuration: avgDuration[0]?.avgDuration || 0,
      callsByType,
      callsByOutcome,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCallLog,
  getAllCallLogs,
  getCallLogById,
  updateCallLog,
  deleteCallLog,
  getCallLogsByEntity,
  getCallStatistics,
};
