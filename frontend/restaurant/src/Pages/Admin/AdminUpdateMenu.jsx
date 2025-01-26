import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMenuItemById } from "@/Hook/Menu/useMenuItemById";
import useUpdateMenuItem from "@/Hook/Menu/useUpdateMenuItem";
import { Button } from "@/components/ui/button";

const AdminUpdateMenu = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useMenuItemById(id);
  const [details, setDetails] = useState({
    name: "",
    category: "",
    price: 0,
    description: "",
    available: false,
    image: "",
  });

  const { mutate: updateMenuItem, isLoading: isUpdating } = useUpdateMenuItem();

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setDetails({ ...details, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateMenuItem({ menuItemId: id, updatedData: details });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading menu item details.</p>;

  return (
    <form
      className="mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-gray-800">Update Menu Item</h2>

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
            htmlFor="available"
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

      <Button
        type="submit"
        disabled={isUpdating}
        className={`w-full px-4 py-2 text-white ${
          isUpdating ? "bg-gray-400" : "bg-blue-500"
        } `}
      >
        {isUpdating ? "Updating..." : "Update Menu Item"}
      </Button>
    </form>
  );
};

export default AdminUpdateMenu;
