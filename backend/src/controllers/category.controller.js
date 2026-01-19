const Category = require("../models/Category.model");
const { successResponse } = require("../utils/response");

// CREATE CATEGORY
const createCategory = async (req, res, next) => {
  try {
    const category = await Category.create({
      ...req.body,
      createdBy: req.user._id,
    });

    successResponse(res, "Category created successfully", category, 201);
  } catch (error) {
    next(error);
  }
};

// GET ALL CATEGORIES
const getAllCategories = async (req, res, next) => {
  try {
    const { type } = req.query;

    const filter = type ? { type, isActive: true } : { isActive: true };

    const categories = await Category.find(filter).sort({ name: 1 });

    successResponse(res, "Categories retrieved successfully", categories);
  } catch (error) {
    next(error);
  }
};

// GET CATEGORY BY ID
const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      throw { statusCode: 404, message: "Category not found" };
    }

    successResponse(res, "Category retrieved successfully", category);
  } catch (error) {
    next(error);
  }
};

// UPDATE CATEGORY
const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!category) {
      throw { statusCode: 404, message: "Category not found" };
    }

    successResponse(res, "Category updated successfully", category);
  } catch (error) {
    next(error);
  }
};

// DELETE CATEGORY (SOFT DELETE)
const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!category) {
      throw { statusCode: 404, message: "Category not found" };
    }

    successResponse(res, "Category deleted successfully", null);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
