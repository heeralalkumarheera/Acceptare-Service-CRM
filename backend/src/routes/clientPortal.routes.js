const express = require("express");
const router = express.Router();

const {
  getClientProfile,
  getClientQuotations,
  getClientInvoices,
  getClientAmcs,
} = require("../controllers/clientPortal.controller");

const { protectClient } = require("../middlewares/clientAuth.middleware");

router.get("/profile", protectClient, getClientProfile);
router.get("/quotations", protectClient, getClientQuotations);
router.get("/invoices", protectClient, getClientInvoices);
router.get("/amcs", protectClient, getClientAmcs);

module.exports = router;
