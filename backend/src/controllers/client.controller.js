const { successResponse } = require("../utils/response");

const getClients = async (req, res, next) => {
  try {
    // logic later
    successResponse(res, "Clients fetched successfully", []);
  } catch (error) {
    next(error);
  }
};

module.exports = { getClients };
