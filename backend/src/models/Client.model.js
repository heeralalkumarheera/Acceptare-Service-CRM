const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    contactPerson: String,
    email: String,
    phone: String,
    gst: String,
    address: String,
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", clientSchema);
