const Permission = require("../models/Permission.model");
const { successResponse } = require("../utils/response");

// CREATE PERMISSION
const createPermission = async (req, res, next) => {
  try {
    const { name, description, module, action } = req.body;

    const permission = await Permission.create({
      name,
      description,
      module,
      action,
    });

    successResponse(res, "Permission created successfully", permission, 201);
  } catch (error) {
    next(error);
  }
};

// GET ALL PERMISSIONS
const getAllPermissions = async (req, res, next) => {
  try {
    const { module } = req.query;

    const filter = module ? { module } : {};

    const permissions = await Permission.find(filter).sort({ module: 1, action: 1 });

    successResponse(res, "Permissions retrieved successfully", permissions);
  } catch (error) {
    next(error);
  }
};

// UPDATE PERMISSION
const updatePermission = async (req, res, next) => {
  try {
    const permission = await Permission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!permission) {
      throw { statusCode: 404, message: "Permission not found" };
    }

    successResponse(res, "Permission updated successfully", permission);
  } catch (error) {
    next(error);
  }
};

// DELETE PERMISSION
const deletePermission = async (req, res, next) => {
  try {
    const permission = await Permission.findByIdAndDelete(req.params.id);

    if (!permission) {
      throw { statusCode: 404, message: "Permission not found" };
    }

    successResponse(res, "Permission deleted successfully", null);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPermission,
  getAllPermissions,
  updatePermission,
  deletePermission,
};
