const Client = require("../models/Client.model");
const Quotation = require("../models/Quotation.model");
const Invoice = require("../models/Invoice.model");

// CLIENT PROFILE
const getClientProfile = async (req, res) => {
  try {
    const client = await Client.findById(req.client.id).select("-__v");
    res.status(200).json({ success: true, data: client });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CLIENT QUOTATIONS
const getClientQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find({
      client: req.client.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: quotations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CLIENT INVOICES
const getClientInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({
      client: req.client.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getClientProfile,
  getClientQuotations,
  getClientInvoices,
};
