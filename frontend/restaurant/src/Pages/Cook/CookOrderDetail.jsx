import React from "react";

const CookOrderDetail = ({ order }) => {
  if (!order) {
    order = {
      id: 1,
      table: 5,
      status: "New",
      items: ["Pizza", "Salad"],
      notes: "No onions on salad",
    };
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold">
          Table {order.table} - Order #{order.id}
        </h2>
        <p className="text-gray-600 mb-2">Status: {order.status}</p>
        <p className="text-gray-600 mb-2">Items: {order.items.join(", ")}</p>
        <p className="text-gray-600 mb-2">Notes: {order.notes}</p>
        <div className="mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
            Mark as In Progress
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Mark as Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookOrderDetail;
