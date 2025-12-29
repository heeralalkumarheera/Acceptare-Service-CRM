const express = require("express");
const router = express.Router();

const {
  createInvoiceFromQuotation,
  getAllInvoices,
  getInvoicesByClient,
  updatePayment,
} = require("../controllers/invoice.controller");

const {
  protect,
  authorizeRoles,
} = require("../middlewares/auth.middleware");

// CREATE INVOICE FROM QUOTATION
router.post(
  "/from-quotation/:quotationId",
  protect,
  authorizeRoles("admin", "sales"),
  createInvoiceFromQuotation
);

// GET ALL INVOICES
router.get("/", protect, getAllInvoices);

// GET CLIENT-WISE INVOICES (DAY 10)
router.get(
  "/client/:clientId",
  protect,
  getInvoicesByClient
);

// UPDATE PAYMENT
router.put(
  "/:id/payment",
  protect,
  authorizeRoles("admin"),
  updatePayment
);

module.exports = router;
