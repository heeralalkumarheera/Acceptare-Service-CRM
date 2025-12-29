const Amc = require("../models/Amc.model");

// CREATE AMC (same as before)
const createAmc = async (req, res) => {
  try {
    const amc = await Amc.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "AMC created successfully",
      data: amc,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔥 AUTO CHECK & UPDATE AMC STATUS
const checkAmcExpiry = async () => {
  const today = new Date();

  const amcs = await Amc.find({ status: "active" });

  for (let amc of amcs) {
    if (today > amc.endDate) {
      amc.status = "expired";
      amc.isRenewable = true;
      await amc.save();
    }
  }
};

// GET ALL AMCs (auto logic included)
const getAllAmcs = async (req, res) => {
  try {
    await checkAmcExpiry();

    const amcs = await Amc.find()
      .populate("client", "companyName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: amcs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// RENEW AMC
const renewAmc = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    const amc = await Amc.findById(req.params.id);

    if (!amc) {
      return res
        .status(404)
        .json({ success: false, message: "AMC not found" });
    }

    if (!amc.isRenewable) {
      return res.status(400).json({
        success: false,
        message: "AMC is not eligible for renewal",
      });
    }

    amc.startDate = startDate;
    amc.endDate = endDate;
    amc.status = "active";
    amc.isRenewable = false;

    await amc.save();

    res.status(200).json({
      success: true,
      message: "AMC renewed successfully",
      data: amc,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createAmc,
  getAllAmcs,
  renewAmc,
};
