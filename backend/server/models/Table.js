const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
  {
    tableNumber: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
    seats: {
      type: Number,
      required: true,
      min: [1, "A table must have at least one seat."],
    },
    status: {
      type: String,
      enum: ["available", "occupied", "reserved"],
      default: "available",
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Table = mongoose.model("Table", tableSchema);
module.exports = Table;
