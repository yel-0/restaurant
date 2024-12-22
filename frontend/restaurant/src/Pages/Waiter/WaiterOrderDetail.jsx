import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import OrderAddDialog from "@/Design/Waiter/OrderAddDialog";
import useFetchOrderById from "@/Hook/Order/useFetchOrderById";

export default function WaiterOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: fetchedOrder,
    isLoading,
    isError,
    error,
  } = useFetchOrderById(id);

  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (fetchedOrder) {
      setOrder(fetchedOrder);
    }
  }, [fetchedOrder]);

  const updateQuantity = (index, newQuantity) => {
    setOrder((prevOrder) => {
      const updatedItems = [...prevOrder.items];
      updatedItems[index].quantity = newQuantity;
      return { ...prevOrder, items: updatedItems };
    });
  };

  const deleteItem = (index) => {
    setOrder((prevOrder) => {
      const updatedItems = prevOrder.items.filter((_, i) => i !== index);
      return { ...prevOrder, items: updatedItems };
    });
  };

  const addItem = (newItem) => {
    setOrder((prevOrder) => {
      const existingIndex = prevOrder.items.findIndex(
        (item) => item.product._id === newItem._id
      );

      if (existingIndex !== -1) {
        const updatedItems = [...prevOrder.items];
        updatedItems[existingIndex].quantity += 1;
        return { ...prevOrder, items: updatedItems };
      } else {
        return {
          ...prevOrder,
          items: [...prevOrder.items, { product: newItem, quantity: 1 }],
        };
      }
    });
  };

  const calculateTotal = () => {
    return order?.items.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    );
  };

  if (isLoading)
    return <div className="text-center text-gray-600">Loading...</div>;
  if (isError)
    return (
      <div className="text-center text-red-600">Error: {error.message}</div>
    );

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200 space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Order Details
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-1">
          <h2 className="text-sm font-medium text-gray-700">Table Number</h2>
          <p className="text-lg font-semibold text-gray-900">
            {order.table.tableNumber}
          </p>
        </div>
        <div className="space-y-1">
          <h2 className="text-sm font-medium text-gray-700">Waiter Name</h2>
          <p className="text-lg font-semibold text-gray-900">
            {order.createdBy.name}
          </p>
        </div>
        <div className="space-y-1">
          <h2 className="text-sm font-medium text-gray-700">Order Status</h2>
          <p className="text-lg font-semibold text-gray-900">{order.status}</p>
        </div>
        <div className="space-y-1">
          <h2 className="text-sm font-medium text-gray-700">Payment Status</h2>
          <span
            className={`text-lg font-semibold ${
              order.status === "completed" ? "text-green-600" : "text-red-600"
            }`}
          >
            {order.status === "completed" ? "Paid" : "Pending"}
          </span>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Order Items
        </h2>
        <div className="space-y-4">
          {order?.items.map((item, index) => (
            <div
              key={item.product._id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm border"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.product.image || "/placeholder.png"}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <p className="text-lg font-medium text-gray-800">
                    {item.product.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    ${item.product.price} each
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(index, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-l-lg"
                >
                  -
                </button>
                <span className="px-4 py-1 bg-white border text-gray-800">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(index, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-r-lg"
                >
                  +
                </button>
              </div>
              <p className="text-lg font-semibold text-gray-800">
                ${item.quantity * item.product.price}
              </p>
              <button
                onClick={() => deleteItem(index)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <OrderAddDialog onAddItem={addItem} />

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-700">
          Total:{" "}
          <span className="text-gray-800">${calculateTotal().toFixed(2)}</span>
        </h2>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
          className="text-gray-800"
        >
          Back
        </Button>
        <Button variant="primary" className="bg-blue-600 hover:bg-blue-700">
          Submit Changes
        </Button>
      </div>
    </div>
  );
}
