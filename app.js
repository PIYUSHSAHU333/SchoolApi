const express = require("express");
const dotenv = require("dotenv");
const schoolRoutes = require("./routes/schoolRoutes.js");
dotenv.config();
const app = express();
app.use(express.json());

app.use("/", schoolRoutes);
console.log(process.env.DB_NAME);

app.listen("8080", () => {
  console.log("Server running on port 8080");
});
