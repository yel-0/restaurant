import React, { useState, useEffect } from "react";
import { useOrderCart } from "@/context/OrderCartContext";
import useFetchTables from "@/Hook/Table/useFetchTables";
import useCreateOrder from "@/Hook/Order/useCreateOrder";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const WaiterOrderSummary = () => {
  const { cartItems, addToCart, removeFromCart, decreaseQuantity } =
    useOrderCart();
  const [note, setNote] = useState("");
  const [selectedTable, setSelectedTable] = useState(null); // Initially null
  const [status, setStatus] = useState("pending"); // Order status (default is pending)
  const [searchQuery, setSearchQuery] = useState(""); // For searching tables
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const { toast } = useToast();

  const taxRate = 0.1;

  const {
    data,
    isLoading: tableLoading,
    isError,
  } = useFetchTables({
    search: searchQuery,
    page: currentPage,
  });
  const { tables, totalPages } = data || {};

  const { mutate: createOrder, isLoading, isSuccess, error } = useCreateOrder();

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
    toast({
      title: "Item removed from cart",
      description: "The item has been removed from your cart.",

      variant: "destructive",
    });
  };

  const handleSubmitOrder = async () => {
    const subtotal = calculateSubtotal();
    const orderData = {
      table: selectedTable,
      items: cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      subtotal: subtotal,
      tax: calculateTax(subtotal),
      total: calculateTotal(subtotal),
      specialNotes: note,
      status: status,
    };
    createOrder(orderData);
  };

  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal);

  useEffect(() => {
    if (searchQuery.length === 0) {
      setSelectedTable(null); // Reset selectedTable if searchQuery is empty
    }
  }, [searchQuery]);

  if (tableLoading) {
    return <div>Loading tables...</div>;
  }

  if (isError) {
    return <div>Error fetching tables.</div>;
  }

  const filteredTables = tables?.filter((table) =>
    table.tableNumber.toString().includes(searchQuery)
  );

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Order Summary</h1>

      <div className="mb-6">
        <label htmlFor="table-search" className="text-lg text-gray-600">
          Search Table
        </label>
        <div className="flex mb-2 relative">
          <Input
            type="text"
            id="table-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Table Number"
            className="p-5 px-3"
          />
          {searchQuery && !tableLoading && filteredTables?.length === 0 && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-1">
              <p className="text-gray-500 p-2">No tables found</p>
            </div>
          )}
        </div>

        {searchQuery && !tableLoading && filteredTables?.length > 0 && (
          <ul className="mt-2">
            {filteredTables.map((table) => (
              <li
                key={table._id}
                onClick={() => setSelectedTable(table._id)}
                className={`cursor-pointer p-2 bg-gray-100 hover:bg-gray-200 rounded-lg ${
                  selectedTable === table._id
                    ? "bg-blue-100 border-2 border-blue-500 text-blue-700" // Add border and text color change
                    : ""
                }`}
              >
                Table {table.tableNumber}
              </li>
            ))}
          </ul>
        )}
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

      <Button
        onClick={handleSubmitOrder}
        disabled={isLoading || !selectedTable || cartItems.length === 0}
        className="w-full "
      >
        {isLoading ? "Submitting..." : "Submit Order"}
      </Button>
    </div>
  );
};

export default WaiterOrderSummary;
