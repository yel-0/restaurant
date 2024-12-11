import React from "react";
import { useOrderCart } from "@/context/OrderCartContext";
const WaiterMenuItemCard = ({ item }) => {
  const { addToCart } = useOrderCart(); // Access addToCart function from the context

  const handleAddToOrder = () => {
    // Add the item to the order using the addToCart function from the context
    addToCart(item);

    // Optionally, show a confirmation message
    alert(`Added ${item.name} to the order`);
  };

  return (
    <div className="border rounded-lg shadow-md p-4 w-64">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{item.description}</p>

      {/* Stock Quantity Display */}
      <div className="mb-2">
        <span className="text-sm text-gray-600">Stock: </span>
        <span className="text-lg font-bold text-green-600">{item.stock}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-lg font-bold">${item.price}</span>
        <button
          onClick={handleAddToOrder}
          className="px-3 py-1 bg-green-600 text-white text-sm rounded-md"
        >
          Add to Order
        </button>
      </div>
    </div>
  );
};

export default WaiterMenuItemCard;
