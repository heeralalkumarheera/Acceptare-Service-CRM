const Client = require("../models/Client.model");

// CREATE CLIENT
const createClient = async (req, res, next) => {
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
    next(error);
  }
};

const paginate = require("../utils/pagination");

// GET ALL CLIENTS (PAGINATED)
const getAllClients = async (req, res, next) => {
  try {
    const { page, limit, skip } = paginate(req);

    const clients = await Client.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();
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
    next(error);
  }
};


// UPDATE CLIENT
const updateClient = async (req, res, next) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!client) {
      throw { statusCode: 404, message: "Client not found" };
    }

    res.status(200).json({
      success: true,
      message: "Client updated successfully",
      data: client,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE CLIENT
const deleteClient = async (req, res, next) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      throw { statusCode: 404, message: "Client not found" };
    }

    res.status(200).json({
      success: true,
      message: "Client deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createClient,
  getAllClients,
  updateClient,
  deleteClient,
};
