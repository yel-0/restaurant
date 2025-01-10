// components/OrderItem.jsx
import React from "react";

const OrderItem = ({
  item,
  order,
  handlePreparedQtyChange,
  preparedQuantities,
  isUpdating,
  handleInputChange,
}) => {
  return (
    <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
      <div>
        <p className="text-lg font-semibold text-gray-800">{item.name}</p>
        <p className="text-sm text-gray-600">Product: {item.product.name}</p>
      </div>

      <div className="text-right">
        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
        <p className="text-sm text-gray-500">
          Prepared: {item.preparedQuantity}
        </p>
        <p className="text-sm text-gray-500">Price: ${item.price}</p>

        {/* Action Buttons */}
        <div className="mt-2 flex gap-3 justify-between">
          <button
            onClick={() =>
              handlePreparedQtyChange(
                order._id,
                item._id,
                preparedQuantities[`${order._id}_${item._id}`] ??
                  item.preparedQuantity
              )
            }
            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 w-28"
            disabled={isUpdating}
          >
            Complete
          </button>

          <input
            type="number"
            min="0"
            max={item.quantity}
            value={
              preparedQuantities[`${order._id}_${item._id}`] ??
              item.preparedQuantity
            }
            onChange={(e) => {
              const newQty = Number(e.target.value);
              handleInputChange(order._id, item._id, newQty); // Only update the temporary state
            }}
            className="w-16 p-2 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
