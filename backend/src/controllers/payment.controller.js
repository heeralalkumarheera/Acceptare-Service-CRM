const Invoice = require("../models/Invoice.model");
const { createOrder, verifyPayment } = require("../utils/payment.service");

// CREATE PAYMENT ORDER
const createPaymentOrder = async (req, res) => {
  try {
    const { invoiceId } = req.body;

    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res
        .status(404)
        .json({ success: false, message: "Invoice not found" });
    }

    const order = await createOrder({
      amount: invoice.totalAmount,
    });

    res.status(200).json({
      success: true,
      message: "Payment order created",
      data: {
        order,
        invoiceId: invoice._id,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// VERIFY PAYMENT (MOCK)
const verifyPaymentOrder = async (req, res) => {
  try {
    const { invoiceId, orderId, paymentId } = req.body;

    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res
        .status(404)
        .json({ success: false, message: "Invoice not found" });
    }

    const result = await verifyPayment({ orderId, paymentId });

    if (result.success) {
      invoice.paymentStatus = "paid";
      invoice.paidAmount = invoice.totalAmount;
      await invoice.save();
    }

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPaymentOrder,
  verifyPaymentOrder,
};
