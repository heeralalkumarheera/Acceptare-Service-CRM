const express = require("express");
const router = express.Router();

const {
  createPaymentOrder,
  verifyPaymentOrder,
} = require("../controllers/payment.controller");

const { protect, authorizeRoles } = require("../middlewares/auth.middleware");

// CREATE ORDER
router.post(
  "/create-order",
  protect,
  authorizeRoles("admin"),
  createPaymentOrder
);

// VERIFY PAYMENT
router.post(
  "/verify",
  protect,
  authorizeRoles("admin"),
  verifyPaymentOrder
);

module.exports = router;
