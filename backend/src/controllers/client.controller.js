const Client = require("../models/Client.model");

// CREATE CLIENT
const createClient = async (req, res) => {
  try {
    const client = await Client.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Client created successfully",
      data: client,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const paginate = require("../utils/pagination");

// GET ALL CLIENTS (PAGINATED)
const getAllClients = async (req, res) => {
  try {
    const { page, limit, skip } = paginate(req);

    const clients = await Client.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();
    //for all clients total count
    //const total = await Client.countDocuments();
    //not count inactive or deleted clients
    const total = await Client.countDocuments({ status: "active" });

    res.status(200).json({
      success: true,
      data: clients,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// UPDATE CLIENT
const updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Client updated successfully",
      data: client,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE CLIENT
const deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Client deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createClient,
  getAllClients,
  updateClient,
  deleteClient,
};
