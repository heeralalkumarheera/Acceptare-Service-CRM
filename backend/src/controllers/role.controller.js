const Role = require("../models/Role.model");
const Permission = require("../models/Permission.model");
const { successResponse } = require("../utils/response");

// CREATE ROLE
const createRole = async (req, res, next) => {
  try {
    const { name, description, permissions } = req.body;

    const role = await Role.create({
      name,
      description,
      permissions,
      isSystem: false,
    });

    successResponse(res, "Role created successfully", role, 201);
  } catch (error) {
    next(error);
  }
};

// GET ALL ROLES
const getAllRoles = async (req, res, next) => {
  try {
    const roles = await Role.find().populate("permissions").sort({ createdAt: -1 });

    successResponse(res, "Roles retrieved successfully", roles);
  } catch (error) {
    next(error);
  }
};

// GET ROLE BY ID
const getRoleById = async (req, res, next) => {
  try {
    const role = await Role.findById(req.params.id).populate("permissions");

    if (!role) {
      throw { statusCode: 404, message: "Role not found" };
    }

    successResponse(res, "Role retrieved successfully", role);
  } catch (error) {
    next(error);
  }
};

// UPDATE ROLE
const updateRole = async (req, res, next) => {
  try {
    const role = await Role.findById(req.params.id);

    if (!role) {
      throw { statusCode: 404, message: "Role not found" };
    }

    if (role.isSystem) {
      throw { statusCode: 403, message: "Cannot modify system roles" };
    }

    const updatedRole = await Role.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("permissions");

    successResponse(res, "Role updated successfully", updatedRole);
  } catch (error) {
    next(error);
  }
};

// DELETE ROLE
const deleteRole = async (req, res, next) => {
  try {
    const role = await Role.findById(req.params.id);

    if (!role) {
      throw { statusCode: 404, message: "Role not found" };
    }

    if (role.isSystem) {
      throw { statusCode: 403, message: "Cannot delete system roles" };
    }

    await Role.findByIdAndDelete(req.params.id);

    successResponse(res, "Role deleted successfully", null);
  } catch (error) {
    next(error);
  }
};

// ASSIGN PERMISSIONS TO ROLE
const assignPermissions = async (req, res, next) => {
  try {
    const { permissions } = req.body;

    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { permissions },
      { new: true }
    ).populate("permissions");

    if (!role) {
      throw { statusCode: 404, message: "Role not found" };
    }

    successResponse(res, "Permissions assigned successfully", role);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
  assignPermissions,
};
