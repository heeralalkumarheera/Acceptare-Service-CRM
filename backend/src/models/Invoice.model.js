const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true },
    quotation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quotation",
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    subTotal: { type: Number, required: true },
    gstPercent: { type: Number, default: 18 },
    gstAmount: { type: Number, required: true },
    totalAmount: { type: Number, required: true },

    paymentStatus: {
      type: String,
      enum: ["unpaid", "partial", "paid"],
      default: "unpaid",
    },
    paidAmount: { type: Number, default: 0 },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
invoiceSchema.index({ client: 1 });
invoiceSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Invoice", invoiceSchema);
