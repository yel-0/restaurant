import React, { useState } from "react";
import { useOrderCart } from "@/context/OrderCartContext";
import useFetchTables from "@/Hook/Table/useFetchTables";
import useCreateOrder from "@/Hook/Order/useCreateOrder";

const WaiterOrderSummary = () => {
  const { cartItems, addToCart, removeFromCart, decreaseQuantity } =
    useOrderCart();
  const [note, setNote] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const [status, setStatus] = useState("pending"); // Order status (default is pending)

  const taxRate = 0.1;

  const { data: tables, isLoading: tableLoading, isError } = useFetchTables();
  const { createOrder, isLoading, isSuccess, error } = useCreateOrder();

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
    if (change === 1) {
      const item = cartItems.find((item) => item._id === itemId);
      addToCart(item, change);
    } else if (change === -1) {
      decreaseQuantity(itemId); // Decrease quantity using the new function
    }
  };

  const handleDeleteItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleSubmitOrder = async () => {
    const subtotal = calculateSubtotal();
    const orderData = {
      table: selectedTable,
      items: cartItems.map((item) => ({
        product: item._id, // Assuming `_id` corresponds to the product reference
        quantity: item.quantity,
        price: item.price,
      })),
      subtotal: subtotal,
      tax: calculateTax(subtotal),
      total: calculateTotal(subtotal),
      specialNotes: note,
      status: status, // Use selected order status
      createdBy: "userId", // Assuming the user is logged in and you have their userId
    };

    // const response = await createOrder(orderData);
    // if (response) {
    //   console.log("Order submitted successfully:", response);
    // }

    console.log(orderData);
  };

  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal);

  if (tableLoading) {
    return <div>Loading tables...</div>;
  }

  if (isError) {
    return <div>Error fetching tables.</div>;
  }

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
          {tables &&
            tables.map((table) => (
              <option key={table._id} value={table._id}>
                Table {table.tableNumber}
              </option>
            ))}
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
              key={item._id}
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
                    onClick={() => handleQuantityChange(item._id, -1)}
                    className="px-3 py-1 bg-gray-200 rounded-md text-lg font-semibold hover:bg-gray-300 transition"
                  >
                    -
                  </button>
                  <span className="text-gray-700 text-sm">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, 1)}
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
                  onClick={() => handleDeleteItem(item._id)}
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
        <label htmlFor="order-notes" className="text-lg text-gray-600">
          Special Notes:
        </label>
        <textarea
          id="order-notes"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows="4"
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add any special instructions or requests..."
        />
      </div>

      <button
        onClick={handleSubmitOrder}
        className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
        disabled={isLoading || !selectedTable || cartItems.length === 0}
      >
        {isLoading ? "Submitting..." : "Submit Order"}
      </button>

      {isSuccess && (
        <p className="text-green-500 mt-4">Order submitted successfully!</p>
      )}
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
    </div>
  );
};

export default WaiterOrderSummary;
