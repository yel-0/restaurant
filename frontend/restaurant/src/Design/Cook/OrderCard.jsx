import React from "react";
import OrderItem from "./OrderItem";
import StatusBadge from "./StatusBadge";

const OrderCard = ({
  order,
  handlePreparedQtyChange,
  handleStatusChange,
  preparedQuantities,
  isUpdating,
  handleInputChange,
}) => {
  return (
    <div
      key={order._id}
      className="bg-gray-50 border w-[350px] border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200"
    >
      {/* Table Info and Order Status */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Table #{order.table.tableNumber || "N/A"}
        </h2>
        <StatusBadge status={order.status} />
      </div>

      {/* Order Date */}
      <p className="text-sm text-gray-500 mb-4">
        Order Date:{" "}
        {new Date(order.orderDate).toLocaleString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        })}
      </p>

      {/* Special Notes (Highlighted) */}
      <div className="mb-4 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
        <p className="text-sm font-bold text-gray-700">
          <span className="font-medium">Special Notes: </span>
          {order.specialNotes || "None"}
        </p>
      </div>

      {/* Items List */}
      <div className="space-y-3">
        {order.items.map((item) => (
          <OrderItem
            key={item._id}
            item={item}
            order={order}
            handlePreparedQtyChange={handlePreparedQtyChange}
            preparedQuantities={preparedQuantities}
            isUpdating={isUpdating}
            handleInputChange={handleInputChange}
          />
        ))}
      </div>

      {/* Mark Entire Order as In-Progress Button */}
      <div className="flex justify-between gap-4 mt-4">
        <button
          onClick={() => handleStatusChange(order._id, "in-progress")}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 w-full"
          disabled={isUpdating}
        >
          Mark Order as In-Progress
        </button>

        <button
          onClick={() => handleStatusChange(order._id, "completed")}
          className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 w-full"
          disabled={isUpdating}
        >
          Mark Order as Completed
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
