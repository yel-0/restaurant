import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import OrderAddDialog from "@/Design/Waiter/OrderAddDialog";
import useFetchOrderById from "@/Hook/Order/useFetchOrderById";

export default function WaiterOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: order, isLoading, isError, error } = useFetchOrderById(id);

  const [quantities, setQuantities] = useState({});
  const [updatedItems, setUpdatedItems] = useState([]);
  const [updatedQuantities, setUpdatedQuantities] = useState({}); // Track quantities for updated items

  // Initialize quantities when the order is fetched
  useEffect(() => {
    if (order) {
      const initialQuantities = order.items.reduce((acc, item) => {
        acc[item.product._id] = item.quantity;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [order]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const handleIncrease = (productId, isUpdated = false) => {
    if (isUpdated) {
      setUpdatedQuantities((prev) => ({
        ...prev,
        [productId]: (prev[productId] || 1) + 1,
      }));
    } else {
      setQuantities((prev) => ({
        ...prev,
        [productId]: prev[productId] + 1,
      }));
    }
  };

  const handleDecrease = (productId, isUpdated = false) => {
    if (isUpdated) {
      setUpdatedQuantities((prev) => ({
        ...prev,
        [productId]: Math.max(1, (prev[productId] || 1) - 1),
      }));
    } else {
      setQuantities((prev) => ({
        ...prev,
        [productId]: Math.max(1, prev[productId] - 1),
      }));
    }
  };

  const handleAddItem = (newItem) => {
    setUpdatedItems((prev) => [...prev, { product: newItem, quantity: 1 }]);
    setUpdatedQuantities((prev) => ({
      ...prev,
      [newItem._id]: 1,
    }));
  };

  const calculateTotal = () => {
    const orderTotal = order.items.reduce(
      (total, item) => total + quantities[item.product._id] * item.price,
      0
    );

    const updatedTotal = updatedItems.reduce(
      (total, item) =>
        total + updatedQuantities[item.product._id] * item.product.price,
      0
    );

    return orderTotal + updatedTotal;
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-lg border border-gray-200">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        Order Details - {order._id}
      </h1>

      <div className="space-y-8">
        {/* Order Information */}
        <div className="bg-blue-100 p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-700">
              Order Information
            </h2>
            <OrderAddDialog onAddItem={handleAddItem} />
          </div>
          <div className="text-gray-600 text-lg">
            <p>
              Table:{" "}
              <span className="font-semibold">
                {order.table?.tableNumber || "N/A"}
              </span>
            </p>
            <p>
              Status:{" "}
              <span
                className={`font-semibold ${
                  order.status === "pending"
                    ? "text-yellow-600"
                    : order.status === "served"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {order.status}
              </span>
            </p>
            <p>Special Notes: {order.specialNotes || "None"}</p>
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
                key={item.product._id}
                className="flex items-center justify-between border-b border-gray-300 pb-4 hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                <div className="flex items-center space-x-6">
                  <img
                    src={item.product.image || "https://via.placeholder.com/80"}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl shadow-lg"
                  />
                  <div className="text-gray-700">
                    <p className="font-semibold text-lg">{item.product.name}</p>
                    <p className="text-sm text-gray-500">
                      Price: ${item.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Total: $
                      {(quantities[item.product._id] * item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Button onClick={() => handleDecrease(item.product._id)}>
                    -
                  </Button>
                  <p className="text-gray-700 font-semibold">
                    {quantities[item.product._id]}
                  </p>
                  <Button onClick={() => handleIncrease(item.product._id)}>
                    +
                  </Button>
                </div>
              </li>
            ))}

            {/* Render Updated Items */}
            {updatedItems.map((item, index) => (
              <li
                key={`new-${index}`}
                className="flex items-center justify-between border-b border-gray-300 pb-4 hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                <div className="flex items-center space-x-6">
                  <img
                    src={item.product.image || "https://via.placeholder.com/80"}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-xl shadow-lg"
                  />
                  <div className="text-gray-700">
                    <p className="font-semibold text-lg">{item.product.name}</p>
                    <p className="text-sm text-gray-500">
                      Price: ${item.product.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Total: $
                      {(
                        updatedQuantities[item.product._id] * item.product.price
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => handleDecrease(item.product._id, true)}
                  >
                    -
                  </Button>
                  <p className="text-gray-700 font-semibold">
                    {updatedQuantities[item.product._id]}
                  </p>
                  <Button
                    onClick={() => handleIncrease(item.product._id, true)}
                  >
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mt-8">
          <p className="text-3xl font-semibold text-gray-800">
            Total: ${calculateTotal().toFixed(2)}
          </p>
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
