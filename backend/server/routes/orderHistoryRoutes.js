const express = require("express");
const { getOrderHistory } = require("../Controller/orderHistoryController");

const router = express.Router();

// Route to get order history by orderId
router.get("/:orderId", getOrderHistory);

module.exports = router;
