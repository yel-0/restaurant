const OrderHistory = require("../models/OrderHistory");

// Function to get order history by orderId
const getOrderHistory = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the order history by orderId
    const orderHistory = await OrderHistory.find({ order: orderId })
      .populate("order", "orderNumber") // You can populate fields like orderNumber if needed
      .populate("changedBy", "name email") // Populate the user who changed the order
      .sort({ changeDate: -1 }); // Sort by changeDate in descending order

    if (!orderHistory) {
      return res.status(404).json({ message: "Order history not found" });
    }

    return res.status(200).json(orderHistory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getOrderHistory,
};
