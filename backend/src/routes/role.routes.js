const express = require("express");
const router = express.Router();

const {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
  assignPermissions,
} = require("../controllers/role.controller");

const { protect, authorizeRoles } = require("../middlewares/auth.middleware");

// All role routes are admin-only
router.post("/", protect, authorizeRoles("admin"), createRole);
router.get("/", protect, authorizeRoles("admin"), getAllRoles);
router.get("/:id", protect, authorizeRoles("admin"), getRoleById);
router.put("/:id", protect, authorizeRoles("admin"), updateRole);
router.delete("/:id", protect, authorizeRoles("admin"), deleteRole);
router.post("/:id/permissions", protect, authorizeRoles("admin"), assignPermissions);

module.exports = router;
