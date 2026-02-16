const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  uploadDocument,
  getClientDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  downloadDocument,
} = require("../controllers/clientDocument.controller");

const { protect, authorizeRoles } = require("../middlewares/auth.middleware");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/client-documents/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: function (req, file, cb) {
    const allowedTypes = /pdf|doc|docx|xls|xlsx|jpg|jpeg|png/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only documents and images are allowed"));
    }
  },
});

// UPLOAD DOCUMENT
router.post(
  "/",
  protect,
  authorizeRoles("admin", "sales"),
  upload.single("document"),
  uploadDocument
);

// GET ALL DOCUMENTS FOR A CLIENT (specific route - comes before generic /:id)
router.get("/client/:clientId", protect, getClientDocuments);

// GET DOCUMENT BY ID
router.get("/:id", protect, getDocumentById);

// DOWNLOAD DOCUMENT (specific route - /download before generic /:id/something)
router.get("/:id/download", protect, downloadDocument);

// UPDATE DOCUMENT METADATA
router.put("/:id", protect, authorizeRoles("admin", "sales"), updateDocument);

// DELETE DOCUMENT
router.delete("/:id", protect, authorizeRoles("admin"), deleteDocument);

module.exports = router;
