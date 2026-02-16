const Joi = require("joi");

// User validation
const registerValidation = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("admin", "sales", "support").optional(),
});

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Client validation
const clientValidation = Joi.object({
  companyName: Joi.string().min(3).max(100).required(),
  contactPerson: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  gst: Joi.string().optional(),
  address: Joi.string().optional(),
  status: Joi.string().valid("active", "inactive").optional(),
});

// Lead validation
const leadValidation = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  source: Joi.string()
    .valid("website", "call", "email", "manual")
    .optional(),
  stage: Joi.string()
    .valid("new", "contacted", "qualified", "proposal", "won", "lost")
    .optional(),
  expectedRevenue: Joi.number().min(0).optional(),
  assignedTo: Joi.string().optional(),
});

// Expense validation
const expenseValidation = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  amount: Joi.number().min(0).required(),
  category: Joi.string().required(),
  expenseDate: Joi.date().optional(),
  note: Joi.string().max(500).optional(),
});

// Task validation
const taskValidation = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).optional(),
  category: Joi.string().optional(),
  priority: Joi.string().valid("low", "medium", "high", "urgent").optional(),
  status: Joi.string()
    .valid("pending", "in-progress", "completed", "cancelled")
    .optional(),
  dueDate: Joi.date().required(),
  assignedTo: Joi.string().required(),
  relatedTo: Joi.string()
    .valid("Lead", "Client", "Invoice", "Quotation")
    .optional(),
  relatedId: Joi.string().optional(),
});

// Call Log validation
const callLogValidation = Joi.object({
  relatedTo: Joi.string().valid("Lead", "Client").required(),
  relatedId: Joi.string().required(),
  callType: Joi.string().valid("incoming", "outgoing", "missed").required(),
  callStatus: Joi.string()
    .valid("completed", "missed", "rejected", "busy")
    .required(),
  duration: Joi.number().min(0).optional(),
  phoneNumber: Joi.string().required(),
  notes: Joi.string().max(500).optional(),
  callDateTime: Joi.date().optional(),
  outcome: Joi.string()
    .valid(
      "interested",
      "not-interested",
      "callback-later",
      "converted",
      "no-answer",
      "other"
    )
    .optional(),
});

// Category validation
const categoryValidation = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  type: Joi.string().valid("expense", "income", "task").required(),
  description: Joi.string().max(200).optional(),
  color: Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/).optional(),
});

// Validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors,
      });
    }

    next();
  };
};

module.exports = {
  validate,
  registerValidation,
  loginValidation,
  clientValidation,
  leadValidation,
  expenseValidation,
  taskValidation,
  callLogValidation,
  categoryValidation,
};
