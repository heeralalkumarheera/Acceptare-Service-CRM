const express = require("express");
const router = express.Router();

const {
  getClientProfile,
  getClientQuotations,
  getClientInvoices,
} = require("../controllers/clientPortal.controller");

const { protectClient } = require("../middlewares/clientAuth.middleware");

router.get("/profile", protectClient, getClientProfile);
router.get("/quotations", protectClient, getClientQuotations);
router.get("/invoices", protectClient, getClientInvoices);

module.exports = router;
