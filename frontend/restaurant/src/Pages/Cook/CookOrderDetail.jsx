import React from "react";

const CookOrderDetail = ({ order }) => {
  // Mock data for testing when no order is provided
  if (!order) {
    order = {
      id: 1,
      table: 5,
      status: "New",
      items: [
        { name: "Pizza", quantity: 1, specialRequest: "Extra cheese" },
        { name: "Salad", quantity: 2, specialRequest: "No onions" },
      ],
      notes: "Serve salad first",
      placedAt: "12:30 PM",
      estimatedPreparationTime: "25 mins",
    };
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800">Order Details</h1>

      {/* Order Details Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {/* Basic Details */}
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Table {order.table} - Order #{order.id}
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.status === "New"
                ? "bg-yellow-100 text-yellow-800"
                : order.status === "In Progress"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {order.status}
          </span>
        </div>

        {/* Time and Notes */}
        <div className="mt-4 space-y-2">
          <p className="text-gray-600">
            <strong>Order Placed:</strong> {order.placedAt}
          </p>
          <p className="text-gray-600">
            <strong>Estimated Preparation Time:</strong>{" "}
            {order.estimatedPreparationTime}
          </p>
          {order.notes && (
            <p className="text-gray-600">
              <strong>Notes:</strong> {order.notes}
            </p>
          )}
        </div>

        {/* Order Items */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Items:</h3>
          <ul className="mt-2 space-y-2">
            {order.items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-gray-600 text-sm">
                    Quantity: {item.quantity}
                  </p>
                  {item.specialRequest && (
                    <p className="text-gray-500 text-sm">
                      Special Request: {item.specialRequest}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Mark as In Progress
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Mark as Completed
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
            Reject Order
          </button>
        </div>
      </div>

      {/* Add Notes Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800">Add Notes</h3>
        <textarea
          className="w-full mt-2 p-3 border rounded-lg focus:ring focus:ring-blue-300"
          rows="4"
          placeholder="Add any special notes for this order..."
        ></textarea>
        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Save Notes
        </button>
      </div>
    </div>
  );
};

export default CookOrderDetail;
