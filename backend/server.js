const express = require("express");
const app = express();
require("dotenv").config();

const connectDB = require("./src/config/db");
const errorHandler = require("./src/middlewares/error.middleware");

app.use(express.json());

app.use("/api/auth", require("./src/routes/auth.routes"));
app.use("/api/users", require("./src/routes/user.routes"));

app.use("/api/clients", require("./src/routes/client.routes"));
app.use("/api/leads", require("./src/routes/lead.routes"));
app.use("/api/quotations", require("./src/routes/quotation.routes"));
app.use("/api/invoices", require("./src/routes/invoice.routes"));
app.use("/api/amcs", require("./src/routes/amc.routes"));


app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to database then start server
connectDB().catch((err) => {
  console.log("Continuing without database...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
