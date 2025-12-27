const express = require("express");
const app = express();

const errorHandler = require("./src/middlewares/error.middleware");

app.use(express.json());

app.use("/api/clients", require("./src/routes/client.routes"));

app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
