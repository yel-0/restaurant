const express = require("express");
const {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require("../Controller/menuItemController");
const multer = require("multer");

const router = express.Router();
const upload = multer();

// Routes for menu items
router.get("/menu-items", getAllMenuItems);
router.get("/menu-items/:id", getMenuItemById);
router.post("/menu-items", upload.none(), createMenuItem);
router.put("/menu-items/:id", updateMenuItem);
router.delete("/menu-items/:id", deleteMenuItem);

module.exports = router;
