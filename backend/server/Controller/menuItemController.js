const menuItemService = require("../services/MenuItemService");

// Get all menu items with filters and pagination
exports.getAllMenuItems = async (req, res) => {
  try {
    const { category, name, limit, page } = req.query;
    const result = await menuItemService.getAllMenuItems({ category, name, limit, page });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch menu items", error });
  }
};

// Get a single menu item by ID
exports.getMenuItemById = async (req, res) => {
  try {
    const menuItem = await menuItemService.getMenuItemById(req.params.id);
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
    const menuItem = await menuItemService.createMenuItem(req.body);
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to create menu item", error });
  }
};

// Update a menu item
exports.updateMenuItem = async (req, res) => {
  try {
    const menuItem = await menuItemService.updateMenuItem(req.params.id, req.body);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to update menu item", error });
  }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const message = await menuItemService.deleteMenuItem(req.params.id);
    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete menu item", error });
  }
};
