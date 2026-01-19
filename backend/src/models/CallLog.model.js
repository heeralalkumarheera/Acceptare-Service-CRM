const mongoose = require("mongoose");

const callLogSchema = new mongoose.Schema(
  {
    relatedTo: {
      type: String,
      enum: ["Lead", "Client"],
      required: true,
    },
    relatedId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "relatedTo",
    },
    callType: {
      type: String,
      enum: ["incoming", "outgoing", "missed"],
      required: true,
    },
    callStatus: {
      type: String,
      enum: ["completed", "missed", "rejected", "busy"],
      required: true,
    },
    duration: {
      type: Number, // Duration in seconds
      default: 0,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    callDateTime: {
      type: Date,
      default: Date.now,
    },
    recordedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    outcome: {
      type: String,
      enum: [
        "interested",
        "not-interested",
        "callback-later",
        "converted",
        "no-answer",
        "other",
      ],
    },
  },
  { timestamps: true }
);

callLogSchema.index({ relatedTo: 1, relatedId: 1 });
callLogSchema.index({ recordedBy: 1 });
callLogSchema.index({ callDateTime: -1 });

module.exports = mongoose.model("CallLog", callLogSchema);
