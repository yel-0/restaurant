const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI;

mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Routes
const userRoutes = require("./routes/User");
app.use("/user", userRoutes);

const menuRoutes = require("./routes/menuRoutes");
app.use("/api", menuRoutes);

const categoryRoutes = require("./routes/CategoryRoute");
app.use("/category", categoryRoutes);

const tableRoutes = require("./routes/TableRoutes");
app.use("/tables", tableRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
