const express = require("express");
const router = express.Router();

const {
  createCallLog,
  getAllCallLogs,
  getCallLogById,
  updateCallLog,
  deleteCallLog,
  getCallLogsByEntity,
  getCallStatistics,
} = require("../controllers/callLog.controller");

const { protect, authorizeRoles } = require("../middlewares/auth.middleware");

// CREATE CALL LOG
router.post("/", protect, createCallLog);

// GET ALL CALL LOGS
router.get("/", protect, getAllCallLogs);

// GET CALL STATISTICS
router.get("/statistics", protect, getCallStatistics);

// GET CALL LOG BY ID
router.get("/:id", protect, getCallLogById);

// GET CALL LOGS BY ENTITY (Lead/Client)
router.get("/:entityType/:entityId", protect, getCallLogsByEntity);

// UPDATE CALL LOG
router.put("/:id", protect, updateCallLog);

// DELETE CALL LOG
router.delete("/:id", protect, authorizeRoles("admin"), deleteCallLog);

module.exports = router;
