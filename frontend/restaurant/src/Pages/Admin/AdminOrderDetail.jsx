import AdminOrderHistory from "@/Design/Admin/AdminOrderHistory";
import OrderAddDialog from "@/Design/Waiter/OrderAddDialog";
import useFetchOrderById from "@/Hook/Order/useFetchOrderById";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUpdateOrder } from "@/Hook/Order/useUpdateOrder";
const AdminOrderDetail = () => {
  const { id } = useParams();
  const TAX_RATE = 0.1;
  const { data, isLoading, isError } = useFetchOrderById(id);
  const { mutate: updateOrder, isLoading: isUpdating } = useUpdateOrder();

  const [order, setOrder] = useState(null);

  // Load data into state when fetched
  useEffect(() => {
    if (data) {
      setOrder(data);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !order) return <p>Error loading order details.</p>;

  // Calculate total price
  const calculateSubtotal = () => {
    return order.items
      .reduce((total, item) => total + item.quantity * item.price, 0)
      .toFixed(2);
  };

  // Calculate tax
  const calculateTax = () => {
    const subtotal = parseFloat(calculateSubtotal());
    return (subtotal * TAX_RATE).toFixed(2);
  };

  // Calculate final total
  const calculateFinalTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const tax = parseFloat(calculateTax());
    return (subtotal + tax).toFixed(2);
  };

  // Handle quantity update
  const updateQuantity = (index, newQuantity) => {
    if (!order) return;

    setOrder((prevOrder) => {
      const updatedItems = [...prevOrder.items];
      updatedItems[index].quantity = newQuantity;
      return { ...prevOrder, items: updatedItems };
    });
  };

  // Handle deleting an item
  const deleteItem = (index) => {
    if (!order) return;

    setOrder((prevOrder) => {
      const updatedItems = prevOrder.items.filter((_, i) => i !== index);
      return { ...prevOrder, items: updatedItems };
    });
  };

  const addItem = (newItem) => {
    if (!order) return;

    setOrder((prevOrder) => {
      const existingIndex = prevOrder.items.findIndex(
        (item) => item.product._id === newItem._id
      );

      if (existingIndex !== -1) {
        const updatedItems = [...prevOrder.items];
        updatedItems[existingIndex].quantity += 1;
        updatedItems[existingIndex].price = newItem.price;
        return { ...prevOrder, items: updatedItems };
      } else {
        return {
          ...prevOrder,
          items: [
            ...prevOrder.items,
            {
              product: newItem,
              quantity: 1,
              price: newItem.price,
              name: newItem.name,
            },
          ],
        };
      }
    });
  };

  const updateSpecialNotes = (notes) => {
    if (!order) return;

    setOrder((prevOrder) => ({
      ...prevOrder,
      specialNotes: notes,
    }));
  };
  // Handle payment update
  const markAsPaid = () => {
    setOrder((prevOrder) => ({ ...prevOrder, status: "completed" }));
  };

  const submitChanges = () => {
    const { status, items, specialNotes } = order;

    updateOrder({ id, data: { status, items, specialNotes } });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Details</h1>
        <p className="text-gray-600">Order ID: {order._id}</p>
        <AdminOrderHistory orderId={order._id} />
      </div>

      {/* Order Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <OrderAddDialog onAddItem={addItem} />
        <div>
          <h2 className="font-medium text-gray-700">Table Number</h2>
          <p className="text-gray-900">{order.table.tableNumber}</p>
        </div>
        <div>
          <h2 className="font-medium text-gray-700">Waiter Name</h2>
          <p className="text-gray-900">{order.createdBy.name}</p>
        </div>
        <div>
          <h2 className="font-medium text-gray-700">Order Status</h2>
          <p className="text-gray-900">{order.status}</p>
        </div>
        <div>
          <h2 className="font-medium text-gray-700">Payment Status</h2>
          <span
            className={`font-semibold ${
              order.status === "completed" ? "text-green-600" : "text-red-600"
            }`}
          >
            {order.status === "completed" ? "Paid" : "Pending"}
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
                <td className="px-4 py-2 flex items-center gap-2">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                  {item.product.name}
                </td>
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
                <td className="px-4 py-2">${item.price.toFixed(2)}</td>
                <td className="px-4 py-2">
                  ${(item.quantity * item.price).toFixed(2)}
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

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-700">Special Notes</h2>
        <textarea
          value={order.specialNotes || ""}
          onChange={(e) => updateSpecialNotes(e.target.value)}
          className="w-full p-4 border rounded-lg text-gray-800 focus:ring focus:ring-blue-300"
          placeholder="Add any special notes for the order..."
        />
      </div>

      {/* Total Calculation */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between text-lg font-medium">
          <span>Subtotal:</span>
          <span>${calculateSubtotal()}</span>
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
            order.status === "completed"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } text-white`}
          disabled={order.status === "completed"}
        >
          {order.status === "completed" ? "Paid" : "Mark as Paid"}
        </button>
      </div>
      <Button
        variant="primary"
        className="bg-blue-600 hover:bg-blue-700"
        onClick={submitChanges}
        disabled={isUpdating}
      >
        {isUpdating ? "Saving..." : "Submit Changes"}
      </Button>
    </div>
  );
};

export default AdminOrderDetail;
