const Order = require("../models/Order");
const OrderHistory = require("../models/OrderHistory");

const mongoose = require("mongoose");

const createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { table, items, subtotal, tax, total, specialNotes } = req.body;
    const createdBy = req.user.userId;

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

    // Save the order within the transaction
    await newOrder.save({ session });

    // Create an entry in OrderHistory
    const orderHistoryEntry = new OrderHistory({
      order: newOrder._id,
      changes: [
        {
          field: "Order Created",
          previousValue: null,
          newValue: {
            // table,
            items,
            // subtotal,
            // tax,
            // total,
            // specialNotes,
          },
        },
      ],
      changedBy: createdBy,
      changeDate: new Date(),
    });

    // Save the history entry within the transaction
    await orderHistoryEntry.save({ session });

    // Commit the transaction if both operations succeed
    await session.commitTransaction();
    session.endSession();

    return res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    // Rollback the transaction
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get all Orders (for admin or manager)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ orderDate: -1 }) // Sort by orderDate in descending order
      .populate("table", "tableNumber") // Optional: populate table details
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
      .populate("items.product", "name price image")
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

const updateOrder = async (req, res) => {
  const session = await mongoose.startSession(); // Start a session
  session.startTransaction(); // Begin a transaction

  try {
    const orderId = req.params.id;
    const { status, items, specialNotes } = req.body;
    const userId = req.user.userId; // Get the userId from the request

    // Check if the order exists
    let order = await Order.findById(orderId).session(session);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Track changes
    const changes = [];

    // Update status if provided
    if (status && status !== order.status) {
      changes.push({
        field: "status",
        previousValue: order.status,
        newValue: status,
      });
      order.status = status;
    }

    // console.log("New Items:");
    // console.table(
    //   items.map((item) => ({
    //     name: item.name,
    //   }))
    // );

    // Update items if provided
    if (items && JSON.stringify(items) !== JSON.stringify(order.items)) {
      changes.push({
        field: "items",
        previousValue: order.items.map((item) => ({
          product: item.product._id, // Only include the _id of the product
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),

        newValue: items.map((item) => ({
          product: item.product._id, // Only include the _id of the product
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      });

      // Recalculate subtotal, tax, and total based on the new items
      let subtotal = 0;
      items.forEach((item) => {
        subtotal += item.price * item.quantity;
      });

      const taxRate = 0.1; // Fixed tax rate (10%)
      const tax = subtotal * taxRate;
      const total = subtotal + tax;

      // Update order with the new items and calculated prices
      order.items = items;

      order.subtotal = subtotal;
      order.tax = tax;
      order.total = total;
    }

    // Update specialNotes if provided
    if (specialNotes && specialNotes !== order.specialNotes) {
      changes.push({
        field: "specialNotes",
        previousValue: order.specialNotes,
        newValue: specialNotes,
      });
      order.specialNotes = specialNotes;
    }

    // If no changes, return early
    if (changes.length === 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(200).json({ message: "No changes detected" });
    }

    // Add the updater to the updatedBy array
    order.updatedBy.push(userId);

    // Save the updated order
    await order.save({ session });

    // Save the order history
    const orderHistory = new OrderHistory({
      order: orderId,
      changes,
      changedBy: userId, // Record the user who made the change
    });
    await orderHistory.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      message: "Order updated successfully",
      order,
      history: orderHistory,
    });
  } catch (error) {
    // Rollback the transaction in case of an error
    await session.abortTransaction();
    session.endSession();
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
