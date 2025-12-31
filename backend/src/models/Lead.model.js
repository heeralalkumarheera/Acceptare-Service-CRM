const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, lowercase: true },
    phone: { type: String, required: true },
    source: {
      type: String,
      enum: ["website", "call", "email", "manual"],
      default: "manual",
    },
    stage: {
      type: String,
      enum: ["new", "contacted", "qualified", "proposal", "won", "lost"],
      default: "new",
    },
    expectedRevenue: { type: Number, default: 0 },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
leadSchema.index({ status: 1 });
leadSchema.index({ assignedTo: 1 });

module.exports = mongoose.model("Lead", leadSchema);
