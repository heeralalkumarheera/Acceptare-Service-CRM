const express = require("express");
const app = express();
require("dotenv").config();

const connectDB = require("./src/config/db");
const errorHandler = require("./src/middlewares/error.middleware");
const amcReminderJob = require("./src/utils/amcReminder.service");

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", require("./src/routes/auth.routes"));
app.use("/api/users", require("./src/routes/user.routes"));
app.use("/api/clients", require("./src/routes/client.routes"));
app.use("/api/leads", require("./src/routes/lead.routes"));
app.use("/api/quotations", require("./src/routes/quotation.routes"));
app.use("/api/invoices", require("./src/routes/invoice.routes"));
app.use("/api/amcs", require("./src/routes/amc.routes"));
app.use("/api/followups", require("./src/routes/followup.routes"));
app.use("/api/expenses", require("./src/routes/expense.routes"));


// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// 🔥 START SERVER ONLY AFTER DB CONNECT
const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected successfully");

    // 🔔 Start AMC Reminder Cron AFTER DB
    amcReminderJob();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
};

startServer();
