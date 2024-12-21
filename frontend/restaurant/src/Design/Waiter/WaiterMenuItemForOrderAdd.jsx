import { Button } from "@/components/ui/button";
import React from "react";

const WaiterMenuItemForOrderAdd = ({ item, onAdd }) => {
  const handleAddClick = () => {
    if (onAdd) {
      onAdd(item); // Pass the item to the onAdd function
    }
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
      </div>

      <Button
        onClick={handleAddClick}
        className="w-full mt-4 bg-green-500 text-white hover:bg-green-600 transition duration-300"
      >
        Add
      </Button>
    </div>
  );
};

export default WaiterMenuItemForOrderAdd;
