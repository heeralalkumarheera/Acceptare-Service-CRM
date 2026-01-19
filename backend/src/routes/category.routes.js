const express = require("express");
const router = express.Router();

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

const { protect, authorizeRoles } = require("../middlewares/auth.middleware");

// CREATE CATEGORY (Admin/Sales)
router.post("/", protect, authorizeRoles("admin", "sales"), createCategory);

// GET ALL CATEGORIES (All authenticated users)
router.get("/", protect, getAllCategories);

// GET CATEGORY BY ID
router.get("/:id", protect, getCategoryById);

// UPDATE CATEGORY (Admin/Sales)
router.put("/:id", protect, authorizeRoles("admin", "sales"), updateCategory);

// DELETE CATEGORY (Admin only)
router.delete("/:id", protect, authorizeRoles("admin"), deleteCategory);

module.exports = router;
