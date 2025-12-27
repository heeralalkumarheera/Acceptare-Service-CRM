const express = require("express");
const router = express.Router();

const { getClients } = require("../controllers/client.controller");

router.get("/", getClients);

module.exports = router;
