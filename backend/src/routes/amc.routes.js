const express = require("express");
const router = express.Router();

const {
  createAmc,
  getAllAmcs,
  renewAmc,
} = require("../controllers/amc.controller");

const {
  protect,
  authorizeRoles,
} = require("../middlewares/auth.middleware");

// CREATE AMC
router.post("/", protect, authorizeRoles("admin", "sales"), createAmc);

// GET ALL AMCs (auto expiry logic runs here)
router.get("/", protect, getAllAmcs);

// RENEW AMC
router.put(
  "/:id/renew",
  protect,
  authorizeRoles("admin"),
  renewAmc
);

module.exports = router;
