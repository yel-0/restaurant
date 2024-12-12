const MenuItem = require("../models/MenuItem");

// Get all menu items with filters and pagination
exports.getAllMenuItems = async (req, res) => {
  try {
    const { category, name, limit = 10, page = 1 } = req.query;

    const query = {};
    if (category) {
      query.category = category; // Filter by category
    }
    if (name) {
      query.name = { $regex: name, $options: "i" }; // Filter by name (case-insensitive)
    }

    const itemsPerPage = parseInt(limit);
    const skip = (parseInt(page) - 1) * itemsPerPage;

    const menuItems = await MenuItem.find(query).skip(skip).limit(itemsPerPage);
    const totalItems = await MenuItem.countDocuments(query);

    res.status(200).json({
      menuItems,
      totalItems,
      totalPages: Math.ceil(totalItems / itemsPerPage),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch menu items", error });
  }
};

// Get a single menu item by ID
exports.getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch menu item", error });
  }
};

// Create a new menu item
exports.createMenuItem = async (req, res) => {
  try {
    const { name, price, category, available, image } = req.body;

    const newMenuItem = new MenuItem({
      name,
      price,
      category,
      available,
      image,
      description,
    });

    await newMenuItem.save();
    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to create menu item", error });
  }
};

// Update a menu item
exports.updateMenuItem = async (req, res) => {
  try {
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMenuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to update menu item", error });
  }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedMenuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete menu item", error });
  }
};
