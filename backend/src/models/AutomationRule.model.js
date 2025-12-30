const mongoose = require("mongoose");

const automationRuleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    module: {
      type: String,
      enum: ["Lead", "FollowUp"],
      required: true,
    },

    condition: {
      type: String,
      required: true,
    },

    thresholdDays: {
      type: Number,
      required: true,
    },

    action: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AutomationRule", automationRuleSchema);
