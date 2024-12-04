import React from "react";
import OrderItem from "./OrderItem";
const OrderList = ({ orders }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Order List</h3>
      <div className="space-y-4">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderList;
