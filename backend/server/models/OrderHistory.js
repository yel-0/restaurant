const mongoose = require("mongoose");

const orderHistory = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  changes: [
    {
      field: {
        type: String,
        required: true,
      },
      previousValue: {
        type: mongoose.Schema.Types.Mixed,
        required: false,
      },
      newValue: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
      },
    },
  ],
  changedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  changeDate: {
    type: Date,
    default: Date.now,
  },
});

const OrderHistory = mongoose.model("OrderHistory", orderHistory);

module.exports = OrderHistory;
