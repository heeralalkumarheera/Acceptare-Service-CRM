const express = require("express");
const router = express.Router();

const {
  createPermission,
  getAllPermissions,
  updatePermission,
  deletePermission,
} = require("../controllers/permission.controller");

const { protect, authorizeRoles } = require("../middlewares/auth.middleware");

// All permission routes are admin-only
router.post("/", protect, authorizeRoles("admin"), createPermission);
router.get("/", protect, authorizeRoles("admin"), getAllPermissions);
router.put("/:id", protect, authorizeRoles("admin"), updatePermission);
router.delete("/:id", protect, authorizeRoles("admin"), deletePermission);

module.exports = router;
