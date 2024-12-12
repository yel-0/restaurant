import React from "react";

const CookTVScreen = () => {
  const orders = [
    { id: 1, table: 5, status: "New", items: ["Pizza", "Salad"] },
    { id: 2, table: 3, status: "In Progress", items: ["Pasta"] },
  ];

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Kitchen Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-gray-800 p-4 rounded-lg shadow text-center"
          >
            <h2 className="text-xl font-semibold mb-2">
              Table {order.table} - Order #{order.id}
            </h2>
            <p className="text-gray-400 mb-2">
              Items: {order.items.join(", ")}
            </p>
            <span
              className={`px-3 py-1 rounded text-black ${
                order.status === "New"
                  ? "bg-green-400"
                  : order.status === "In Progress"
                  ? "bg-blue-400"
                  : "bg-gray-400"
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

export default CookTVScreen;
