const express = require("express");
const router = express.Router();

const { clientLogin } = require("../controllers/clientAuth.controller");

router.post("/login", clientLogin);

module.exports = router;
