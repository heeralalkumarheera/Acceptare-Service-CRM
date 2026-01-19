const express = require("express");
const router = express.Router();

const {
  getSalesReport,
  getExpenseReport,
  getLeadPerformanceReport,
  getTaskPerformanceReport,
  getCallLogReport,
  getClientReport,
} = require("../controllers/report.controller");

const { protect, authorizeRoles } = require("../middlewares/auth.middleware");

// All reports are accessible by authenticated users
// Admin and sales can see all reports
router.get("/sales", protect, authorizeRoles("admin", "sales"), getSalesReport);
router.get("/expenses", protect, getExpenseReport);
router.get("/leads", protect, authorizeRoles("admin", "sales"), getLeadPerformanceReport);
router.get("/tasks", protect, getTaskPerformanceReport);
router.get("/call-logs", protect, getCallLogReport);
router.get("/clients", protect, authorizeRoles("admin", "sales"), getClientReport);

module.exports = router;
