const mongoose = require("mongoose");

const amcSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    serviceFrequency: {
      type: String,
      enum: ["monthly", "quarterly", "yearly"],
      default: "yearly",
    },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["active", "expired"],
      default: "active",
    },
    isRenewable: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Amc", amcSchema);
