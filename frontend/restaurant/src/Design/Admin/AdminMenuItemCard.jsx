import React from "react";
import { Link } from "react-router-dom";
import { DeleteMenuItemDialog } from "./DeleteMenuItemDialog";

const AdminMenuItemCard = ({ item }) => {
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
        <div className="flex space-x-2">
          <Link
            to={`/admin/menu/update/${item._id}`}
            className="px-3 py-3 bg-blue-600 text-white text-sm rounded-md"
          >
            Edit
          </Link>
          <DeleteMenuItemDialog item={item} />
        </div>
      </div>
    </div>
  );
};

export default AdminMenuItemCard;
