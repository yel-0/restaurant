import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMenuItemById } from "@/Hook/Menu/useMenuItemById";

const MenuItemDetailsForm = ({ details, setDetails }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setDetails({ ...details, [name]: newValue });
  };

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={details.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={details.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Base Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={details.price}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={details.description}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="available"
          name="available"
          checked={details.available}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label
          htmlFor="availability"
          className="ml-2 block text-sm text-gray-700"
        >
          Available
        </label>
      </div>

      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          Image URL
        </label>
        <input
          type="text"
          id="image"
          name="image"
          value={details.image}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

const AdminUpdateMenu = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useMenuItemById(id);
  const [details, setDetails] = useState({
    name: "",
    category: "",
    basePrice: 0,
    description: "",
    available: false,
    image: "",
  });

  useEffect(() => {
    if (data) {
      setDetails({
        name: data.name || "",
        category: data.category || "",
        price: data.price || 0,
        description: data.description || "",
        available: data.available || false,
        image: data.image || "",
      });
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form
      className="mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-gray-800">Update Menu Item</h2>
      <MenuItemDetailsForm details={details} setDetails={setDetails} />
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-green-600 rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Update Menu Item
      </button>
    </form>
  );
};

export default AdminUpdateMenu;
