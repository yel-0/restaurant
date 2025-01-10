// pages/CookDashboard.jsx
import React, { useState, useEffect } from "react";
import { useKitchenOrders } from "@/Hook/Order/useKitchenOrders";
import useUpdateOrderAndItems from "@/Hook/Order/useUpdateOrderAndItems";
import OrderCard from "@/Design/Cook/OrderCard";
const CookDashboard = () => {
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format the date as YYYY-MM-DD
  });
  const [preparedQuantities, setPreparedQuantities] = useState({});

  const { data, isLoading, error } = useKitchenOrders(startDate);

  const { mutate: updateOrderAndItems, isLoading: isUpdating } =
    useUpdateOrderAndItems(
      () => {
        alert("Order updated successfully!");
      },
      (error) => {
        alert("Error updating order:", error.response?.data || error);
      }
    );

  const handleStatusChange = (orderId, newStatus) => {
    const payload = {
      orderStatus: newStatus,
    };
    updateOrderAndItems({ orderId, data: payload });
  };

  const handlePreparedQtyChange = (orderId, itemId, newQty) => {
    const payload = {
      items: [
        {
          itemId,
          preparedQuantity: newQty,
        },
      ],
    };
    updateOrderAndItems({ orderId, data: payload });
  };

  const handleInputChange = (orderId, itemId, newQty) => {
    setPreparedQuantities((prevState) => ({
      ...prevState,
      [`${orderId}_${itemId}`]: newQty,
    }));
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
      <div className="space-y-4 flex flex-row justify-around items-center flex-wrap">
        {data?.data && data.data.length > 0 ? (
          data.data.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              handlePreparedQtyChange={handlePreparedQtyChange}
              handleStatusChange={handleStatusChange}
              preparedQuantities={preparedQuantities}
              isUpdating={isUpdating}
              handleInputChange={handleInputChange}
            />
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
