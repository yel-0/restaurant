import React, { useState } from "react";

const WaiterOrderSummary = () => {
  const [orderedItems, setOrderedItems] = useState([
    {
      id: 1,
      name: "Burger",
      quantity: 2,
      price: 8.99,
      image: "https://via.placeholder.com/80?text=Burger",
    },
    {
      id: 2,
      name: "Pizza",
      quantity: 1,
      price: 12.99,
      image: "https://via.placeholder.com/80?text=Pizza",
    },
    {
      id: 3,
      name: "Fries",
      quantity: 3,
      price: 3.99,
      image: "https://via.placeholder.com/80?text=Fries",
    },
  ]);

  const [note, setNote] = useState("");
  const [selectedTable, setSelectedTable] = useState("");

  const taxRate = 0.1;

  const calculateTotal = () => {
    const subtotal = orderedItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    const tax = subtotal * taxRate;
    return (subtotal + tax).toFixed(2);
  };

  const handleQuantityChange = (id, change) => {
    setOrderedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + change, 1) }
          : item
      )
    );
  };

  const handleDeleteItem = (id) => {
    setOrderedItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-xl border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h1>

      <div className="mb-4">
        <label htmlFor="table-select" className="text-sm text-gray-600">
          Select Table:
        </label>
        <select
          id="table-select"
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
          className="w-full p-2 mt-2 border border-gray-300 rounded-md"
        >
          <option value="">-- Select a Table --</option>
          <option value="1">Table 1</option>
          <option value="2">Table 2</option>
          <option value="3">Table 3</option>
          <option value="4">Table 4</option>
        </select>
      </div>

      <table className="min-w-full table-auto">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4 text-left text-gray-600">Item</th>
            <th className="py-2 px-4 text-left text-gray-600">Quantity</th>
            <th className="py-2 px-4 text-left text-gray-600">Price</th>
            <th className="py-2 px-4 text-left text-gray-600">Total</th>
            <th className="py-2 px-4 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orderedItems.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-2 px-4">
                <div className="flex flex-col justify-center items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <span className="text-gray-700">{item.name}</span>
                </div>
              </td>
              <td className="py-2 px-4 flex items-center justify-between w-auto">
                <button
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="px-2 py-1 bg-gray-200 rounded-md"
                >
                  -
                </button>
                <span className="text-gray-700">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, 1)}
                  className="px-2 py-1 bg-gray-200 rounded-md"
                >
                  +
                </button>
              </td>
              <td className="py-2 px-4">${item.price.toFixed(2)}</td>
              <td className="py-2 px-4">
                ${(item.quantity * item.price).toFixed(2)}
              </td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between items-center">
        <p className="text-lg font-semibold">Subtotal: ${calculateTotal()}</p>
        <p className="text-lg font-semibold">
          Tax (10%): ${(calculateTotal() * 0.1).toFixed(2)}
        </p>
        <p className="text-lg font-semibold">Total: ${calculateTotal()}</p>
      </div>

      <div className="mt-4">
        <label htmlFor="notes" className="text-sm text-gray-600">
          Notes:
        </label>
        <textarea
          id="notes"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows="3"
          className="w-full p-2 mt-2 border border-gray-300 rounded-md"
          placeholder="Add any special instructions or notes here..."
        />
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-md"
          onClick={() => alert("Order Submitted!")}
        >
          Submit Order
        </button>
      </div>
    </div>
  );
};

export default WaiterOrderSummary;
