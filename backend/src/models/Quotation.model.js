const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    amount: Number,
    gst: Number,
    totalAmount: Number,
    status: {
      type: String,
      enum: ["draft", "sent", "approved"],
      default: "draft",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quotation", quotationSchema);
