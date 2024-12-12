const express = require("express");
const {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require("../Controller/menuItemController");

const router = express.Router();

// Routes for menu items
router.get("/menu-items", getAllMenuItems);
router.get("/menu-items/:id", getMenuItemById);
router.post("/menu-items", createMenuItem);
router.put("/menu-items/:id", updateMenuItem);
router.delete("/menu-items/:id", deleteMenuItem);

module.exports = router;
