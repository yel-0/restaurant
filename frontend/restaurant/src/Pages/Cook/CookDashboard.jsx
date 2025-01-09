import React, { useState, useEffect } from "react";
import { useKitchenOrders } from "@/Hook/Order/useKitchenOrders";

const CookDashboard = () => {
  // Set the default date to today
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format the date as YYYY-MM-DD
  });

  const { data, isLoading, error } = useKitchenOrders(startDate);

  const handleStatusChange = (orderId, newStatus) => {
    console.log(`Updating status for order ${orderId} to ${newStatus}`);
  };

  const handlePreparedQtyChange = (orderId, itemId, newQty) => {
    console.log(
      `Updating prepared quantity for order ${orderId}, item ${itemId} to ${newQty}`
    );
  };

  if (isLoading)
    return (
      <div className="text-center text-lg text-blue-600">Loading orders...</div>
    );
  if (error)
    return (
      <div className="text-center text-lg text-red-500">
        Error: {error.message}
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Cook Dashboard
      </h1>

      {/* Date Filter Input */}
      <div className="flex justify-center mb-6">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {data?.data && data.data.length > 0 ? (
          data.data.map((order) => (
            <div
              key={order._id}
              className="bg-gray-50 border w-[350px] border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* Table Info and Order Status */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Table #{order.table.tableNumber || "N/A"}
                </h2>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    order.status === "pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : order.status === "in-progress"
                      ? "bg-blue-200 text-blue-800"
                      : order.status === "completed"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {order.status}
                </span>
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
                  <div
                    key={item._id}
                    className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm"
                  >
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Product: {item.product.name}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        Prepared: {item.preparedQuantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        Price: ${item.price}
                      </p>

                      {/* Action Buttons */}
                      <div className="mt-2 flex gap-3 justify-between">
                        <button
                          onClick={() =>
                            handleStatusChange(order._id, "completed")
                          }
                          className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 w-28"
                        >
                          Complete
                        </button>

                        <input
                          type="number"
                          min="0"
                          defaultValue={item.preparedQuantity}
                          onBlur={(e) =>
                            handlePreparedQtyChange(
                              order._id,
                              item._id,
                              e.target.value
                            )
                          }
                          className="w-16 p-2 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mark Entire Order as In-Progress Button */}
              <div className="flex justify-between gap-4 mt-4">
                <button
                  onClick={() => handleStatusChange(order._id, "in-progress")}
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 w-full"
                >
                  Mark Order as In-Progress
                </button>

                {/* Mark Entire Order as Completed Button */}
                <button
                  onClick={() => handleStatusChange(order._id, "completed")}
                  className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 w-full"
                >
                  Mark Order as Completed
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-lg text-gray-600">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
};

export default CookDashboard;
