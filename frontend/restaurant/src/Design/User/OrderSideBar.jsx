import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function OrderSideBar() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Margherita Pizza",
      price: 8.99,
      quantity: 2,
      image:
        "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 2,
      name: "Caesar Salad",
      price: 5.49,
      quantity: 1,
      image:
        "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 3,
      name: "Chocolate Cake",
      price: 4.99,
      quantity: 3,
      image:
        "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ]);

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const calculateTax = (subtotal) => subtotal * 0.1; // 10% tax
  const calculateTotal = (subtotal, tax) => subtotal + tax;

  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal, tax);

  return (
    <div className=" w-[520px] bg-white shadow-lg border-l border-gray-200 p-4 ">
      {/* Header */}
      <div className="text-xl font-bold p-4">Order Sidebar</div>

      {/* Content */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-2 border-b">
            {/* Item Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />

            {/* Item Details */}
            <div className="flex-1">
              <h3 className="text-sm font-medium">{item.name}</h3>
              <p className="text-xs text-gray-500">
                ${item.price.toFixed(2)} x {item.quantity}
              </p>
            </div>

            {/* Quantity Buttons */}
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 bg-gray-200 text-gray-800 font-bold rounded-full flex items-center justify-center hover:bg-gray-300 transition">
                -
              </button>
              <span className="text-sm font-medium">{item.quantity}</span>
              <button className="w-8 h-8 bg-gray-200 text-gray-800 font-bold rounded-full flex items-center justify-center hover:bg-gray-300 transition">
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Table Selection with Dropdown */}
      <div className="mt-4">
        <label
          htmlFor="table"
          className="block text-sm font-medium text-gray-700"
        >
          Select Table
        </label>
        <Select>
          <SelectTrigger className="w-full py-2 px-3 border border-gray-300 rounded-md text-gray-700 focus:ring-indigo-500 focus:border-indigo-500">
            <SelectValue placeholder="Select Table" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Table 1</SelectItem>
            <SelectItem value="2">Table 2</SelectItem>
            <SelectItem value="3">Table 3</SelectItem>
            <SelectItem value="4">Table 4</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Footer */}
      <div className="p-4 space-y-4">
        {/* Subtotal, Tax, Total */}
        <div className="flex justify-between text-sm font-medium text-gray-700">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm font-medium text-gray-700">
          <span>Tax (10%):</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm font-medium text-gray-700">
          <span>Total:</span>
          <span className="font-bold text-black">${total.toFixed(2)}</span>
        </div>

        {/* Payment Button */}
        <button className="w-full py-2 bg-black text-white font-bold rounded-md">
          Pay Now
        </button>
      </div>
    </div>
  );
}
