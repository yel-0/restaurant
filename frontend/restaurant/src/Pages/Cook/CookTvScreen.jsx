import React from "react";

const CookTVScreen = () => {
  const orders = [
    {
      id: 1,
      table: 5,
      status: "New",
      items: ["Pizza", "Salad"],
      notes: "No onions on the salad",
      placedAt: "12:30 PM",
      estimatedTime: "12:50 PM",
      priority: "High",
      cook: "John Doe",
      preparationStage: "Waiting for Ingredients",
      specialRequests: "Extra napkins",
    },
    {
      id: 2,
      table: 3,
      status: "In Progress",
      items: ["Pasta", "Garlic Bread"],
      notes: "Extra cheese on pasta",
      placedAt: "12:20 PM",
      estimatedTime: "12:45 PM",
      priority: "Medium",
      cook: "Jane Smith",
      preparationStage: "Cooking",
      specialRequests: "Gluten-free garlic bread",
    },
    {
      id: 3,
      table: 7,
      status: "Completed",
      items: ["Burger", "Fries"],
      notes: "No ketchup on fries",
      placedAt: "12:00 PM",
      estimatedTime: "12:15 PM",
      priority: "Low",
      cook: "Mike Lee",
      preparationStage: "Ready for Pickup",
      specialRequests: "None",
    },
  ];

  return (
    <div className="p-6  text-white min-h-screen">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-8 text-black">
        Kitchen Orders
      </h1>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-gray-800 p-6 rounded-lg shadow-lg text-left"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">
                Table {order.table} - Order #{order.id}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-bold ${
                  order.status === "New"
                    ? "bg-green-500 text-gray-900"
                    : order.status === "In Progress"
                    ? "bg-blue-500 text-gray-900"
                    : "bg-gray-600 text-white"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Order Details */}
            <div className="text-gray-400 space-y-4">
              <p>
                <span className="font-bold text-white">Items:</span>{" "}
                {order.items.join(", ")}
              </p>
              <p>
                <span className="font-bold text-white">Notes:</span>{" "}
                {order.notes || "None"}
              </p>
              <p>
                <span className="font-bold text-white">Placed At:</span>{" "}
                {order.placedAt}
              </p>
              <p>
                <span className="font-bold text-white">Est. Completion:</span>{" "}
                {order.estimatedTime}
              </p>
              <p>
                <span className="font-bold text-white">Priority:</span>{" "}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${
                    order.priority === "High"
                      ? "bg-red-500 text-gray-900"
                      : order.priority === "Medium"
                      ? "bg-yellow-500 text-gray-900"
                      : "bg-green-500 text-gray-900"
                  }`}
                >
                  {order.priority}
                </span>
              </p>
              <p>
                <span className="font-bold text-white">Assigned Cook:</span>{" "}
                {order.cook}
              </p>
              <p>
                <span className="font-bold text-white">Preparation Stage:</span>{" "}
                {order.preparationStage}
              </p>
              <p>
                <span className="font-bold text-white">Special Requests:</span>{" "}
                {order.specialRequests || "None"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CookTVScreen;
