const Invoice = require("../models/Invoice.model");
const Quotation = require("../models/Quotation.model");

// Helper: invoice number generator
const generateInvoiceNumber = async () => {
  const lastInvoice = await Invoice.findOne()
    .sort({ createdAt: -1 })
    .select("invoiceNumber");

  if (!lastInvoice) return "INV-00001";

  const lastNumber = parseInt(lastInvoice.invoiceNumber.split("-")[1]);
  return `INV-${String(lastNumber + 1).padStart(5, "0")}`;
};


// CREATE INVOICE FROM QUOTATION (DAY 10 LOGIC)
const createInvoiceFromQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.quotationId);

    if (!quotation) {
      return res.status(404).json({
        success: false,
        message: "Quotation not found",
      });
    }

    // 🔥 Duplicate invoice block
    if (quotation.isInvoiced) {
      return res.status(400).json({
        success: false,
        message: "Invoice already generated for this quotation",
      });
    }

    const invoiceNumber = await generateInvoiceNumber();

    const invoice = await Invoice.create({
      invoiceNumber,
      quotation: quotation._id,
      client: quotation.client,
      subTotal: quotation.subTotal,
      gstPercent: quotation.gstPercent,
      gstAmount: quotation.gstAmount,
      totalAmount: quotation.totalAmount,
      createdBy: req.user._id,
    });

    // 🔥 Business flow sync
    quotation.status = "approved";
    quotation.isInvoiced = true;
    await quotation.save();

    res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const paginate = require("../utils/pagination");

// GET ALL INVOICES (PAGINATED)
const getAllInvoices = async (req, res) => {
  try {
    const { page, limit, skip } = paginate(req);

    const invoices = await Invoice.find()
      .populate("client", "companyName email")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    const total = await Invoice.countDocuments();

    res.status(200).json({
      success: true,
      data: invoices,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// CLIENT-WISE INVOICE LIST (DAY 10)
const getInvoicesByClient = async (req, res) => {
  try {
    const invoices = await Invoice.find({
      client: req.params.clientId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: invoices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE PAYMENT STATUS
const updatePayment = async (req, res) => {
  try {
    const { paidAmount } = req.body;

    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    invoice.paidAmount += paidAmount;

    if (invoice.paidAmount >= invoice.totalAmount) {
      invoice.paymentStatus = "paid";
    } else if (invoice.paidAmount > 0) {
      invoice.paymentStatus = "partial";
    }

    await invoice.save();

    res.status(200).json({
      success: true,
      message: "Payment updated",
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createInvoiceFromQuotation,
  getAllInvoices,
  getInvoicesByClient,
  updatePayment,
};
