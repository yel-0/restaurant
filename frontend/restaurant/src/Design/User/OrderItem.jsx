import React from "react";

const OrderItem = () => {
  const order = {
    name: "Order #1234",
    status: "Completed",
    table: 5,
    items: ["Burger", "Fries", "Soda"],
    amount: "$25.00",
  };

  const statusColors = {
    Completed: "text-green-600",
    Pending: "text-yellow-500",
    Cancelled: "text-red-600",
  };

  return (
    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
      {/* Order Details */}
      <div>
        <h4 className="font-medium text-gray-800">{order.name}</h4>
        <p className={`text-sm ${statusColors[order.status]}`}>
          {order.status}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Table:</span> {order.table}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Items:</span> {order.items.join(", ")}
        </p>
      </div>

      {/* Order Amount and Pay Button */}
      <div className="text-right flex flex-col items-end gap-2">
        <span className="font-semibold text-gray-800">{order.amount}</span>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => alert(`Processing payment for ${order.name}`)}
        >
          Pay
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
