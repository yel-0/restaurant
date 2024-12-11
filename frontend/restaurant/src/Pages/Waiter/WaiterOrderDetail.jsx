import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function WaiterOrderDetail() {
  const { orderId } = useParams(); // Get the order ID from URL params
  const navigate = useNavigate(); // Use navigate for page navigation

  // Static order data for UI
  const initialOrder = {
    id: "ORD12345",
    table: "5",
    total: 45.5,
    status: "Pending",
    items: [
      {
        id: 1,
        name: "Burger",
        quantity: 2,
        price: 12.0,
        imageUrl: "https://via.placeholder.com/80?text=Burger",
      },
      {
        id: 2,
        name: "Fries",
        quantity: 1,
        price: 6.5,
        imageUrl: "https://via.placeholder.com/80?text=Fries",
      },
      {
        id: 3,
        name: "Soda",
        quantity: 1,
        price: 5.0,
        imageUrl: "https://via.placeholder.com/80?text=Soda",
      },
    ],
  };

  const [order, setOrder] = useState(initialOrder);

  const handleQuantityChange = (itemId, newQuantity) => {
    setOrder((prevOrder) => {
      const updatedItems = prevOrder.items.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      return { ...prevOrder, items: updatedItems };
    });
  };

  const handleDeleteItem = (itemId) => {
    setOrder((prevOrder) => {
      const updatedItems = prevOrder.items.filter((item) => item.id !== itemId);
      return { ...prevOrder, items: updatedItems };
    });
  };

  // Calculate total dynamically based on quantities
  const calculateTotal = () => {
    return order.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  const handleMarkAsServed = () => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      status: "Served",
    }));
  };

  const handleCancelOrder = () => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      status: "Cancelled",
    }));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-lg border border-gray-200">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        Order Details - {order.id}
      </h1>

      <div className="space-y-8">
        {/* Order Information */}
        <div className="bg-blue-100 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Order Information
          </h2>
          <div className="text-gray-600 text-lg">
            <p>
              Table: <span className="font-semibold">{order.table}</span>
            </p>
            <p>
              Status:{" "}
              <span
                className={`font-semibold ${
                  order.status === "Pending"
                    ? "text-yellow-600"
                    : order.status === "Served"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {order.status}
              </span>
            </p>
          </div>
        </div>

        {/* Items Ordered */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">
            Items Ordered:
          </h2>
          <ul className="space-y-6">
            {order.items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border-b border-gray-300 pb-4 hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                <div className="flex items-center space-x-6">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl shadow-lg"
                  />
                  <div className="text-gray-700">
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Price: ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                    className="w-24 p-3 border-2 border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                  />
                  <Button
                    onClick={() => handleDeleteItem(item.id)}
                    variant="outline"
                    size="sm"
                    className="bg-red-500 text-white hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Total and Actions */}
        <div className="flex justify-between items-center mt-8">
          <p className="text-3xl font-semibold text-gray-800">
            Total: ${calculateTotal().toFixed(2)}
          </p>
        </div>

        <div className="mt-8 flex space-x-8">
          <Button
            variant="outline"
            size="lg"
            className="w-1/2 bg-green-500 text-white hover:bg-green-600 transition duration-200"
            onClick={handleMarkAsServed}
          >
            Mark as Served
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-1/2 bg-red-500 text-white hover:bg-red-600 transition duration-200"
            onClick={handleCancelOrder}
          >
            Cancel Order
          </Button>
        </div>
      </div>

      {/* Navigation Button */}
      <Button
        onClick={() => navigate(-1)} // Navigate back to the previous page
        variant="outline"
        size="lg"
        className="mt-8 block mx-auto"
      >
        Go Back
      </Button>
    </div>
  );
}
