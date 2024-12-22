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
    const { page = 1, limit = 10, search = "" } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Convert search to an integer if it's a numeric value, otherwise default to an empty string
    const searchNumber = !isNaN(parseInt(search, 10))
      ? parseInt(search, 10)
      : null;

    // Define the search query
    const searchQuery = searchNumber
      ? { tableNumber: searchNumber } // Exact match for numeric search
      : {};

    // Fetch filtered tables with pagination
    const tables = await Table.find(searchQuery)
      .skip((pageNumber - 1) * limitNumber) // Skip documents for previous pages
      .limit(limitNumber); // Limit the number of documents per page

    // Count total filtered documents
    const totalTables = await Table.countDocuments(searchQuery);

    res.status(200).json({
      tables,
      totalPages: Math.ceil(totalTables / limitNumber),
      currentPage: pageNumber,
      totalTables,
    });
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
