const ClientDocument = require("../models/ClientDocument.model");
const { successResponse } = require("../utils/response");
const path = require("path");
const fs = require("fs").promises;

// CREATE CLIENT DOCUMENT (File Upload)
const uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      throw { statusCode: 400, message: "No file uploaded" };
    }

    const { client, documentType, description } = req.body;

    const fileExtension = path.extname(req.file.originalname).toLowerCase().replace(".", "");
    
    const document = await ClientDocument.create({
      client,
      fileName: req.file.originalname,
      fileType: fileExtension,
      fileSize: req.file.size,
      filePath: req.file.path,
      documentType,
      description,
      uploadedBy: req.user._id,
    });

    successResponse(res, "Document uploaded successfully", document, 201);
  } catch (error) {
    next(error);
  }
};

// GET ALL DOCUMENTS FOR A CLIENT
const getClientDocuments = async (req, res, next) => {
  try {
    const { clientId } = req.params;

    const documents = await ClientDocument.find({
      client: clientId,
      isActive: true,
    })
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 });

    successResponse(res, "Documents retrieved successfully", documents);
  } catch (error) {
    next(error);
  }
};

// GET DOCUMENT BY ID
const getDocumentById = async (req, res, next) => {
  try {
    const document = await ClientDocument.findById(req.params.id)
      .populate("client", "companyName contactPerson")
      .populate("uploadedBy", "name email");

    if (!document) {
      throw { statusCode: 404, message: "Document not found" };
    }

    successResponse(res, "Document retrieved successfully", document);
  } catch (error) {
    next(error);
  }
};

// UPDATE DOCUMENT METADATA
const updateDocument = async (req, res, next) => {
  try {
    const { documentType, description } = req.body;

    const document = await ClientDocument.findByIdAndUpdate(
      req.params.id,
      { documentType, description },
      { new: true, runValidators: true }
    );

    if (!document) {
      throw { statusCode: 404, message: "Document not found" };
    }

    successResponse(res, "Document updated successfully", document);
  } catch (error) {
    next(error);
  }
};

// DELETE DOCUMENT (Soft delete)
const deleteDocument = async (req, res, next) => {
  try {
    const document = await ClientDocument.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!document) {
      throw { statusCode: 404, message: "Document not found" };
    }

    // Optionally delete the physical file
    // await fs.unlink(document.filePath);

    successResponse(res, "Document deleted successfully", null);
  } catch (error) {
    next(error);
  }
};

// DOWNLOAD DOCUMENT
const downloadDocument = async (req, res, next) => {
  try {
    const document = await ClientDocument.findById(req.params.id);

    if (!document || !document.isActive) {
      throw { statusCode: 404, message: "Document not found" };
    }

    // Set headers for file download
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="${document.fileName}"`);

    // Send file
    res.download(document.filePath, document.fileName);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadDocument,
  getClientDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  downloadDocument,
};
