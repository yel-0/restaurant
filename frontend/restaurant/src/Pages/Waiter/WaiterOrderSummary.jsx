import React, { useState } from "react";
import { useOrderCart } from "@/context/OrderCartContext";

const WaiterOrderSummary = () => {
  const { cartItems, addToCart, removeFromCart } = useOrderCart();
  const [note, setNote] = useState("");
  const [selectedTable, setSelectedTable] = useState("");

  const taxRate = 0.1;

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  const calculateTax = (subtotal) => {
    return subtotal * taxRate;
  };

  const calculateTotal = (subtotal) => {
    return subtotal + calculateTax(subtotal);
  };

  const handleQuantityChange = (itemId, change) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      addToCart({ ...item, quantity: item.quantity + change });
    }
  };

  const handleDeleteItem = (itemId) => {
    removeFromCart(itemId);
  };

  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal);

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Order Summary</h1>

      <div className="mb-6">
        <label htmlFor="table-select" className="text-lg text-gray-600">
          Select Table:
        </label>
        <select
          id="table-select"
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Select a Table --</option>
          <option value="1">Table 1</option>
          <option value="2">Table 2</option>
          <option value="3">Table 3</option>
          <option value="4">Table 4</option>
        </select>
      </div>

      <table className="min-w-full table-auto mb-6">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
              Item
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
              Quantity
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
              Price
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
              Total
            </th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr
              key={item.id}
              className={`border-b ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="py-3 px-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <span className="text-gray-700 text-sm">{item.name}</span>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="px-3 py-1 bg-gray-200 rounded-md text-lg font-semibold hover:bg-gray-300 transition"
                  >
                    -
                  </button>
                  <span className="text-gray-700 text-sm">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="px-3 py-1 bg-gray-200 rounded-md text-lg font-semibold hover:bg-gray-300 transition"
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="py-3 px-4 text-sm text-gray-700">
                ${item.price.toFixed(2)}
              </td>
              <td className="py-3 px-4 text-sm text-gray-700">
                ${(item.quantity * item.price).toFixed(2)}
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md text-sm font-semibold hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-semibold text-gray-800">
          Subtotal: ${subtotal.toFixed(2)}
        </div>
        <div className="text-lg font-semibold text-gray-800">
          Tax (10%): ${tax.toFixed(2)}
        </div>
        <div className="text-lg font-semibold text-gray-800">
          Total: ${total.toFixed(2)}
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="notes" className="text-lg text-gray-600">
          Notes:
        </label>
        <textarea
          id="notes"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows="3"
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add any special instructions or notes here..."
        />
      </div>

      <div className="flex justify-end">
        <button
          className="px-8 py-3 bg-blue-600 text-white rounded-md text-lg font-semibold hover:bg-blue-700 transition"
          onClick={() => alert("Order Submitted!")}
        >
          Submit Order
        </button>
      </div>
    </div>
  );
};

export default WaiterOrderSummary;
