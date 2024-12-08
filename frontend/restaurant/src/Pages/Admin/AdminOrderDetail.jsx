import React from "react";

const AdminOrderDetail = () => {
  // Static data for the order
  const order = {
    id: "101",
    tableNumber: 5,
    waiterName: "John Doe",
    status: "Pending",
    orderTime: "2024-12-08 12:30 PM",
    cashStatus: "Done", // New field for cash status
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
      {
        name: "Soup",
        quantity: 3,
        pricePerUnit: 5.0,
        image: "https://via.placeholder.com/100?text=Soup",
      },
    ],
    specialRequests: "No onions in the salad, please.",
  };

  // Define tax rate (for example 10%)
  const TAX_RATE = 0.1;

  // Calculate total price
  const calculateTotal = () => {
    return order.items
      .reduce((total, item) => total + item.quantity * item.pricePerUnit, 0)
      .toFixed(2);
  };

  // Calculate tax amount
  const calculateTax = () => {
    const total = parseFloat(calculateTotal());
    return (total * TAX_RATE).toFixed(2);
  };

  // Calculate final total with tax
  const calculateFinalTotal = () => {
    const total = parseFloat(calculateTotal());
    const tax = parseFloat(calculateTax());
    return (total + tax).toFixed(2);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-xl p-6 space-y-8">
      {/* Header Section */}
      <div className="border-b border-gray-300 pb-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Order Details
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Order ID: <span className="font-semibold">{order.id}</span>
        </p>
      </div>

      {/* Order Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h2 className="text-sm font-semibold text-gray-600 uppercase">
            Table Number
          </h2>
          <p className="text-xl font-bold text-gray-800">{order.tableNumber}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-600 uppercase">
            Waiter Name
          </h2>
          <p className="text-xl font-bold text-gray-800">{order.waiterName}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-600 uppercase">
            Status
          </h2>
          <span
            className={`inline-block px-4 py-1 text-sm font-semibold rounded-full ${
              order.status === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : order.status === "In Progress"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {order.status}
          </span>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-600 uppercase">
            Order Time
          </h2>
          <p className="text-xl font-bold text-gray-800">{order.orderTime}</p>
        </div>
      </div>

      {/* Cash Status */}
      <div>
        <h2 className="text-sm font-semibold text-gray-600 uppercase mt-4">
          Cash Payment Status
        </h2>
        <span
          className={`inline-block px-4 py-1 text-sm font-semibold rounded-full ${
            order.cashStatus === "Done"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {order.cashStatus === "Done" ? "Paid" : "Pending"}
        </span>
      </div>

      {/* Ordered Items */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Ordered Items
        </h3>
        <table className="w-full border-collapse rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
              <th className="px-4 py-3 border-b">Image</th>
              <th className="px-4 py-3 border-b">Item</th>
              <th className="px-4 py-3 border-b text-center">Quantity</th>
              <th className="px-4 py-3 border-b text-center">Price</th>
              <th className="px-4 py-3 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 text-sm transition-colors"
              >
                <td className="px-4 py-3 border-b">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                </td>
                <td className="px-4 py-3 border-b">{item.name}</td>
                <td className="px-4 py-3 border-b text-center">
                  {item.quantity}
                </td>
                <td className="px-4 py-3 border-b text-center">
                  ${item.pricePerUnit.toFixed(2)}
                </td>
                <td className="px-4 py-3 border-b text-right">
                  ${(item.quantity * item.pricePerUnit).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Special Requests */}
      <div className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-300">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Special Requests
        </h3>
        <p className="text-sm text-gray-600 italic">
          {order.specialRequests || "None"}
        </p>
      </div>

      {/* Pricing Details */}
      <div className="flex justify-between items-center border-t border-gray-300 pt-4">
        <h3 className="text-xl font-bold text-gray-800">Total:</h3>
        <p className="text-2xl font-bold text-gray-600">${calculateTotal()}</p>
      </div>

      {/* Tax Details */}
      <div className="flex justify-between items-center pt-2">
        <h3 className="text-lg font-medium text-gray-800">Tax (10%):</h3>
        <p className="text-xl font-bold text-gray-600">${calculateTax()}</p>
      </div>

      {/* Final Total */}
      <div className="flex justify-between items-center pt-2 border-t border-gray-300">
        <h3 className="text-xl font-bold text-gray-800">Final Total:</h3>
        <p className="text-2xl font-bold text-green-600">
          ${calculateFinalTotal()}
        </p>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
