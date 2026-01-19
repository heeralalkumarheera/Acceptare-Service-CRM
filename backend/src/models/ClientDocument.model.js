const mongoose = require("mongoose");

const clientDocumentSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    fileName: {
      type: String,
      required: true,
      trim: true,
    },
    fileType: {
      type: String,
      required: true,
      enum: ["pdf", "doc", "docx", "xls", "xlsx", "jpg", "jpeg", "png", "other"],
    },
    fileSize: {
      type: Number, // Size in bytes
      required: true,
    },
    filePath: {
      type: String,
      required: true, // Store relative path or cloud URL
    },
    documentType: {
      type: String,
      enum: [
        "contract",
        "invoice",
        "quotation",
        "amc",
        "identity",
        "compliance",
        "other",
      ],
      default: "other",
    },
    description: {
      type: String,
      trim: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

clientDocumentSchema.index({ client: 1, isActive: 1 });
clientDocumentSchema.index({ createdAt: -1 });

module.exports = mongoose.model("ClientDocument", clientDocumentSchema);
