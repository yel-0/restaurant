import React from "react";

const CookOrders = () => {
  const orders = [
    { id: 1, table: 5, status: "New", items: ["Pizza", "Salad"] },
    { id: 2, table: 3, status: "In Progress", items: ["Pasta"] },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-4 rounded-lg shadow border flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">
                Table {order.table} - Order #{order.id}
              </h2>
              <p className="text-gray-600">Items: {order.items.join(", ")}</p>
            </div>
            <span
              className={`px-3 py-1 rounded text-white ${
                order.status === "New"
                  ? "bg-green-500"
                  : order.status === "In Progress"
                  ? "bg-blue-500"
                  : "bg-gray-500"
              }`}
            >
              {order.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CookOrders;
