const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./src/config/db");
const checkEnv = require("./src/config/envCheck");

const errorHandler = require("./src/middlewares/error.middleware");
const { apiLimiter } = require("./src/middlewares/rateLimit.middleware");
const { auditLogger } = require("./src/middlewares/audit.middleware");

const amcReminderJob = require("./src/utils/amcReminder.service");
const { startAutomationCron } = require("./src/utils/automationCron.service");

// =======================
// 🔐 SECURITY MIDDLEWARE
// =======================
app.use(helmet());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(apiLimiter);
app.use(auditLogger);

// =======================
// ROUTES
// =======================
// Authentication & Users
app.use("/api/auth", require("./src/routes/auth.routes"));
app.use("/api/users", require("./src/routes/user.routes"));

// Roles & Permissions (Gyanjeet - Day 3-4)
app.use("/api/roles", require("./src/routes/role.routes"));
app.use("/api/permissions", require("./src/routes/permission.routes"));

// Clients & Documents (Gyanjeet - Day 5-8)
app.use("/api/clients", require("./src/routes/client.routes"));
app.use("/api/client-documents", require("./src/routes/clientDocument.routes"));

// Leads & Call Logs (Komal - Day 3-10)
app.use("/api/leads", require("./src/routes/lead.routes"));
app.use("/api/call-logs", require("./src/routes/callLog.routes"));

// Follow-ups
app.use("/api/followups", require("./src/routes/followup.routes"));

// Notifications (Komal - Day 11-12)
app.use("/api/notifications", require("./src/routes/notification.routes"));

// Expenses & Categories (Deepa - Day 5-8)
app.use("/api/expenses", require("./src/routes/expense.routes"));
app.use("/api/categories", require("./src/routes/category.routes"));

// Tasks & Calendar (Deepa - Day 9-12)
app.use("/api/tasks", require("./src/routes/task.routes"));

// Quotations & Invoices
app.use("/api/quotations", require("./src/routes/quotation.routes"));
app.use("/api/invoices", require("./src/routes/invoice.routes"));

// AMCs & Payments
app.use("/api/amcs", require("./src/routes/amc.routes"));
app.use("/api/payments", require("./src/routes/payment.routes"));

// Dashboard & Reports
app.use("/api/dashboard", require("./src/routes/dashboard.routes"));
app.use("/api/reports", require("./src/routes/report.routes"));

// Calendar (Deepa - Day 11-12)
app.use("/api/calendar", require("./src/routes/calendar.routes"));

// Automation
app.use("/api/automation-rules", require("./src/routes/automation.routes"));

// Client Portal (Deepa - Day 21-30)
app.use("/api/client-auth", require("./src/routes/clientAuth.routes"));
app.use("/api/client-portal", require("./src/routes/clientPortal.routes"));

// Integrations
app.use("/api/integrations", require("./src/routes/integration.routes"));

// Simple health check (no DB needed) for smoke tests
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// =======================
// ERROR HANDLER (LAST)
// =======================
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// =======================
// 🔥 START SERVER
// =======================
const startServer = async () => {
  try {
    // 🔐 ENV SAFETY CHECK (IMPORTANT)
    checkEnv();

    // 🗄️ DB CONNECT
    await connectDB();
    console.log("Database connected successfully");

    // ⏱️ CRON JOBS
    startAutomationCron();
    amcReminderJob();

    // 🚀 SERVER START
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

// Export app for testing; only start server when executed directly
module.exports = { app, startServer };

if (require.main === module) {
  startServer();
}
