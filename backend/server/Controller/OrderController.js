const Order = require("../models/Order");

// Create an Order
const createOrder = async (req, res) => {
  try {
    const { table, items, subtotal, tax, total, specialNotes } = req.body;
    const createdBy = req.user.userId; // Get the user from the token

    // Create a new order
    const newOrder = new Order({
      table,
      items,
      subtotal,
      tax,
      total,
      specialNotes,
      createdBy,
      updatedBy: [],
    });

    // Save the order
    await newOrder.save();

    return res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get all Orders (for admin or manager)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("table", "tableNumber") // Optional, populate table name for convenience
      .populate("items.product", "name price"); // Populate menu item details
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get a single Order by ID
const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId)
      .populate("table", "tableNumber")
      .populate("items.product", "name price")
      .populate("createdBy", "name email"); // Populate the user who created the order

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update an Order
const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status, items, specialNotes } = req.body;

    // Check if order exists
    let order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the order fields
    order.status = status || order.status;
    order.items = items || order.items;
    order.specialNotes = specialNotes || order.specialNotes;
    order.updatedBy.push(req.user.userId); // Add the current user to the update history

    // Save the updated order
    await order.save();

    return res
      .status(200)
      .json({ message: "Order updated successfully", order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete an Order
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Find and delete the order
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
