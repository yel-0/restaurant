import React from "react";
import { ChevronRight } from "lucide-react";

const CookOrders = () => {
  const orders = [
    {
      id: 1,
      table: 5,
      status: "New",
      items: ["Pizza", "Salad"],
      placedAt: "12:30 PM",
    },
    {
      id: 2,
      table: 3,
      status: "In Progress",
      items: ["Pasta"],
      placedAt: "12:20 PM",
    },
    {
      id: 3,
      table: 8,
      status: "Completed",
      items: ["Burger"],
      placedAt: "12:10 PM",
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Orders</h1>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-4 rounded-lg shadow-md border flex justify-between items-center hover:shadow-lg transition-shadow duration-200"
          >
            {/* Order Details */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Table {order.table} - Order #{order.id}
              </h2>
              <p className="text-gray-600 text-sm">
                Items: {order.items.join(", ")}
              </p>
              <p className="text-gray-500 text-sm">
                Placed At: {order.placedAt}
              </p>
            </div>

            {/* Status Badge and Action */}
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "New"
                    ? "bg-green-100 text-green-700"
                    : order.status === "In Progress"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {order.status}
              </span>
              <button
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full focus:outline-none"
                title="View Details"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CookOrders;
