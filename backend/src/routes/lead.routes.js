const express = require("express");
const router = express.Router();
const { validate, leadValidation } = require("../middlewares/validation.middleware");

const {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
  updateLeadStage,
  getLeadsByStage,
  getLeadPipeline,
} = require("../controllers/lead.controller");

const {
  protect,
  authorizeRoles,
} = require("../middlewares/auth.middleware");

// CREATE LEAD (admin, sales)
router.post("/", protect, authorizeRoles("admin", "sales"), validate(leadValidation), createLead);

// GET LEAD PIPELINE SUMMARY (Sales Stage - Komal Day 5-6)
router.get("/pipeline", protect, getLeadPipeline);

// GET LEADS BY STAGE
router.get("/stage/:stage", protect, getLeadsByStage);

// GET ALL LEADS (logged users)
router.get("/", protect, getAllLeads);

// GET LEAD BY ID
router.get("/:id", protect, getLeadById);

// UPDATE LEAD (admin, sales)
router.put("/:id", protect, authorizeRoles("admin", "sales"), updateLead);

// UPDATE LEAD STAGE (admin, sales)
router.patch("/:id/stage", protect, authorizeRoles("admin", "sales"), updateLeadStage);

// DELETE LEAD (admin only)
router.delete("/:id", protect, authorizeRoles("admin"), deleteLead);

module.exports = router;
