const express = require("express");
const router = express.Router();

const {
  createRule,
  getAllRules,
  runRules,
} = require("../controllers/automation.controller");

const { protect, authorizeRoles } = require("../middlewares/auth.middleware");

// CREATE RULE
router.post("/", protect, authorizeRoles("admin"), createRule);

// GET RULES
router.get("/", protect, authorizeRoles("admin"), getAllRules);

// RUN RULES (MANUAL – DAY 19)
router.post("/run", protect, authorizeRoles("admin"), runRules);

module.exports = router;
