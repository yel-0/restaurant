import React, { useState } from "react";

const AdminOrderDetail = () => {
  const TAX_RATE = 0.1;

  // Initial order data
  const initialOrder = {
    id: "101",
    tableNumber: 5,
    waiterName: "John Doe",
    status: "Pending",
    orderTime: "2024-12-08 12:30 PM",
    cashStatus: "Pending",
    items: [
      {
        name: "Pasta",
        quantity: 2,
        pricePerUnit: 12.5,
        image: "https://via.placeholder.com/100?text=Pasta",
      },
      {
        name: "Salad",
        quantity: 1,
        pricePerUnit: 8.0,
        image: "https://via.placeholder.com/100?text=Salad",
      },
    ],
    specialRequests: "No onions in the salad, please.",
  };

  // State for the order
  const [order, setOrder] = useState(initialOrder);

  // Calculate total price
  const calculateTotal = () => {
    return order.items
      .reduce((total, item) => total + item.quantity * item.pricePerUnit, 0)
      .toFixed(2);
  };

  // Calculate tax
  const calculateTax = () => {
    const total = parseFloat(calculateTotal());
    return (total * TAX_RATE).toFixed(2);
  };

  // Calculate final total
  const calculateFinalTotal = () => {
    const total = parseFloat(calculateTotal());
    const tax = parseFloat(calculateTax());
    return (total + tax).toFixed(2);
  };

  // Handle quantity update
  const updateQuantity = (index, newQuantity) => {
    setOrder((prevOrder) => {
      const updatedItems = [...prevOrder.items];
      updatedItems[index].quantity = newQuantity;
      return { ...prevOrder, items: updatedItems };
    });
  };

  // Handle adding a new item
  const addItem = (newItem) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      items: [...prevOrder.items, newItem],
    }));
  };

  // Handle deleting an item
  const deleteItem = (index) => {
    setOrder((prevOrder) => {
      const updatedItems = prevOrder.items.filter((_, i) => i !== index);
      return { ...prevOrder, items: updatedItems };
    });
  };

  // Handle payment update
  const markAsPaid = () => {
    setOrder((prevOrder) => ({ ...prevOrder, cashStatus: "Done" }));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Details</h1>
        <p className="text-gray-600">Order ID: {order.id}</p>
      </div>

      {/* Order Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <h2 className="font-medium text-gray-700">Table Number</h2>
          <p className="text-gray-900">{order.tableNumber}</p>
        </div>
        <div>
          <h2 className="font-medium text-gray-700">Waiter Name</h2>
          <p className="text-gray-900">{order.waiterName}</p>
        </div>
        <div>
          <h2 className="font-medium text-gray-700">Order Status</h2>
          <p className="text-gray-900">{order.status}</p>
        </div>
        <div>
          <h2 className="font-medium text-gray-700">Payment Status</h2>
          <span
            className={`font-semibold ${
              order.cashStatus === "Done" ? "text-green-600" : "text-red-600"
            }`}
          >
            {order.cashStatus}
          </span>
        </div>
      </div>

      {/* Items Table */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Ordered Items</h3>
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border border-gray-200">Item</th>
              <th className="px-4 py-2 border border-gray-200">Quantity</th>
              <th className="px-4 py-2 border border-gray-200">Price</th>
              <th className="px-4 py-2 border border-gray-200">Subtotal</th>
              <th className="px-4 py-2 border border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(index, parseInt(e.target.value, 10))
                    }
                    className="w-16 p-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="px-4 py-2">${item.pricePerUnit.toFixed(2)}</td>
                <td className="px-4 py-2">
                  ${(item.quantity * item.pricePerUnit).toFixed(2)}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => deleteItem(index)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Item Button */}
      {/* <div>
        <button
          onClick={() =>
            addItem({
              name: "Soup",
              quantity: 1,
              pricePerUnit: 5.0,
              image: "https://via.placeholder.com/100?text=Soup",
            })
          }
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Soup
        </button>
      </div> */}

      {/* Total Calculation */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between text-lg font-medium">
          <span>Total:</span>
          <span>${calculateTotal()}</span>
        </div>
        <div className="flex justify-between text-lg font-medium">
          <span>Tax (10%):</span>
          <span>${calculateTax()}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-gray-800">
          <span>Final Total:</span>
          <span>${calculateFinalTotal()}</span>
        </div>
      </div>

      {/* Payment Button */}
      <div>
        <button
          onClick={markAsPaid}
          className={`w-full py-2 rounded ${
            order.cashStatus === "Done"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } text-white`}
          disabled={order.cashStatus === "Done"}
        >
          {order.cashStatus === "Done" ? "Paid" : "Mark as Paid"}
        </button>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
