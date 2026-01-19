const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["expense", "income", "task"],
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    color: {
      type: String, // For UI representation (e.g., "#FF5733")
      default: "#6366F1",
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

categorySchema.index({ type: 1, isActive: 1 });

module.exports = mongoose.model("Category", categorySchema);
