const express = require("express");
const router = express.Router();
const { validate, registerValidation, loginValidation } = require("../middlewares/validation.middleware");

const { register, login } = require("../controllers/auth.controller");

router.post("/register", validate(registerValidation), register);
router.post("/login", validate(loginValidation), login);

module.exports = router;
