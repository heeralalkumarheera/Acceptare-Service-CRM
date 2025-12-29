const express = require("express");
const router = express.Router();

const {
  createAmc,
  getAllAmcs,
  updateAmcStatus,
} = require("../controllers/amc.controller");

const {
  protect,
  authorizeRoles,
} = require("../middlewares/auth.middleware");

// CREATE AMC (admin, sales)
router.post("/", protect, authorizeRoles("admin", "sales"), createAmc);

// GET ALL AMCs
router.get("/", protect, getAllAmcs);

// UPDATE AMC STATUS (admin)
router.put(
  "/:id/status",
  protect,
  authorizeRoles("admin"),
  updateAmcStatus
);

module.exports = router;
