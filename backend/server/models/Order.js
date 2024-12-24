const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItem",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      preparedQuantity: {
        type: Number,
        default: 0,
      },
      price: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        required: true,
        enum: ["pending", "in-progress", "completed", "cancelled"],
        default: "pending",
      },
    },
  ],
  subtotal: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  specialNotes: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "in-progress", "completed", "cancelled"],
    default: "pending",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
    default: null,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  updatedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
