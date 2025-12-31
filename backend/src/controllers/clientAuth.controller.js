const Client = require("../models/Client.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// CLIENT LOGIN
const clientLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const client = await Client.findOne({ email });
    if (!client) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Default password check (for demo / portal start)
    if (password !== "client@123") {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: client._id, role: "client" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Client login successful",
      data: {
        token,
        clientId: client._id,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { clientLogin };
