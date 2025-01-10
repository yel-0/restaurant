const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getKitchenOrders,
  updateOrderAndItemStatuses,
} = require("../Controller/OrderController");
const { verifyToken } = require("../middware/Auth");

// Routes for Order CRUD operations
router.post("/", verifyToken, createOrder); // Create an order (Authenticated)
router.get("/", verifyToken, getAllOrders); // Get all orders (Admin/Manager)
router.get("/:id", verifyToken, getOrderById); // Get a single order by ID
router.put("/:id", verifyToken, updateOrder); // Update an order
router.delete("/:id", verifyToken, deleteOrder); // Delete an order
router.get("/kitchen/orders", getKitchenOrders);
router.put("/orders/:orderId/status", updateOrderAndItemStatuses);

module.exports = router;
