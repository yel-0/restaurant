const express = require("express");
const router = express.Router();
const TableController = require("../Controller/TableController");

// Create a new table
router.post("/create", TableController.createTable);

// Get all tables
router.get("/", TableController.getTables);

// Get a specific table by ID
router.get("/:id", TableController.getTableById);

// Update table information
router.put("/:id", TableController.updateTable);

// Delete a table
router.delete("/delete/:id", TableController.deleteTable);

module.exports = router;
