const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    module: {
      type: String,
      required: true,
      enum: [
        "users",
        "clients",
        "leads",
        "quotations",
        "invoices",
        "amcs",
        "expenses",
        "followups",
        "tasks",
        "reports",
        "settings",
      ],
    },
    action: {
      type: String,
      required: true,
      enum: ["create", "read", "update", "delete", "export"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

permissionSchema.index({ module: 1, action: 1 });

module.exports = mongoose.model("Permission", permissionSchema);
