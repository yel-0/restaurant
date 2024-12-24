const OrderHistory = require("../models/OrderHistory");

// Function to get order history by orderId
const getOrderHistory = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the order history by orderId and exclude the 'changes' field
    const orderHistory = await OrderHistory.find({ order: orderId })
      .populate("order", "orderNumber") // Populate fields like orderNumber if needed
      .populate("changedBy", "name email") // Populate the user who changed the order
      .sort({ changeDate: -1 }) // Sort by changeDate in descending order
      .select("-changes"); // Exclude the 'changes' field from the response

    if (!orderHistory || orderHistory.length === 0) {
      return res.status(404).json({ message: "Order history not found" });
    }

    return res.status(200).json(orderHistory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getOrderHistoryById = async (req, res) => {
  try {
    const { id } = req.params; // The _id of the OrderHistory

    // Find the order history by _id and include all fields, including changes
    const orderHistory = await OrderHistory.findById(id)
      .populate("order", "orderNumber") // Populate fields like orderNumber if needed
      .populate("changedBy", "name email"); // Populate the user who changed the order

    if (!orderHistory) {
      return res.status(404).json({ message: "Order history not found" });
    }

    // Respond with the order history, including all fields (like changes)
    return res.status(200).json(orderHistory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getOrderHistory,
  getOrderHistoryById,
};
