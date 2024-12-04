import React from "react";
import OrderItem from "@/Design/User/OrderItem";
const WaiterProfile = () => {
  const waiter = {
    name: "John Doe",
    position: "Waiter",
    profileImage:
      "https://images.pexels.com/photos/3866555/pexels-photo-3866555.png?auto=compress&cs=tinysrgb&w=600", // Static image
  };

  const orders = [
    {
      id: 1,
      name: "Order #1234",
      status: "Completed",
      table: 3,
      items: ["Pizza", "Water"],
      amount: "$20.00",
    },
    {
      id: 2,
      name: "Order #1235",
      status: "Pending",
      table: 2,
      items: ["Burger", "Fries"],
      amount: "$15.00",
    },
    {
      id: 3,
      name: "Order #1236",
      status: "Cancelled",
      table: 5,
      items: ["Pasta", "Soda"],
      amount: "$18.00",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen w-[100vw] p-8">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-4xl mx-auto">
        {/* Waiter Profile Section */}
        <div className="flex items-center space-x-6">
          <img
            src={waiter.profileImage}
            alt="Waiter"
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {waiter.name}
            </h2>
            <p className="text-lg text-gray-600">{waiter.position}</p>
          </div>
        </div>

        {/* Assigned Orders Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Assigned Orders
          </h3>
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaiterProfile;
