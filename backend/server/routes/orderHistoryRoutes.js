const express = require("express");
const {
  getOrderHistory,
  getOrderHistoryById,
} = require("../Controller/orderHistoryController");

const router = express.Router();

// Route to get order history by orderId
router.get("/:orderId", getOrderHistory);
router.get("/getById/:id", getOrderHistoryById);

module.exports = router;
