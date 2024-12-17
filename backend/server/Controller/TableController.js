const Table = require("../models/Table");

// Create a new table
exports.createTable = async (req, res) => {
  try {
    const { tableNumber, seats, status, location } = req.body;

    const newTable = new Table({
      tableNumber,
      seats,
      status,
      location,
    });

    const savedTable = await newTable.save();
    res.status(201).json(savedTable);
  } catch (error) {
    console.error("Error creating table:", error);
    res.status(500).json({ message: "Error creating table", error });
  }
};

// Get all tables
exports.getTables = async (req, res) => {
  try {
    const tables = await Table.find();
    res.status(200).json(tables);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ message: "Error fetching tables", error });
  }
};

// Get a specific table by ID
exports.getTableById = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }
    res.status(200).json(table);
  } catch (error) {
    console.error("Error fetching table:", error);
    res.status(500).json({ message: "Error fetching table", error });
  }
};

// Update table information
exports.updateTable = async (req, res) => {
  try {
    const { tableNumber, seats, status, location } = req.body;
    const updatedTable = await Table.findByIdAndUpdate(
      req.params.id,
      { tableNumber, seats, status, location },
      { new: true }
    );

    if (!updatedTable) {
      return res.status(404).json({ message: "Table not found" });
    }
    res.status(200).json(updatedTable);
  } catch (error) {
    console.error("Error updating table:", error);
    res.status(500).json({ message: "Error updating table", error });
  }
};

// Delete a table
exports.deleteTable = async (req, res) => {
  try {
    const deletedTable = await Table.findByIdAndDelete(req.params.id);

    if (!deletedTable) {
      return res.status(404).json({ message: "Table not found" });
    }
    res.status(200).json({ message: "Table deleted successfully" });
  } catch (error) {
    console.error("Error deleting table:", error);
    res.status(500).json({ message: "Error deleting table", error });
  }
};
