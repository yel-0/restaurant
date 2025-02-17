import React, { useState } from "react";
import useCreateMenu from "@/Hook/Menu/useCreateMenu";
import useFetchCategories from "@/Hook/Category/useFetchCategories"; // import the custom hook for fetching categories

// Component for entering menu item details
const MenuItemDetailsForm = ({ details, setDetails, categories }) => {
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

      {/* Category dropdown using category._id */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={details.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories?.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
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
        <label htmlFor="available" className="ml-2 block text-sm text-gray-700">
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
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

const AdminCreateMenu = () => {
  const [details, setDetails] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    available: true,
    image: "",
  });

  const { mutate, isLoading } = useCreateMenu();
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useFetchCategories();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert form values
    const formData = new FormData();
    formData.append("name", details.name);
    formData.append("category", details.category); // send category._id
    formData.append("price", parseInt(details.price, 10));
    formData.append("description", details.description);
    formData.append("available", details.available ? "true" : "false");
    formData.append("image", details.image);

    mutate(formData);
  };

  if (categoriesLoading) return <div>Loading categories...</div>;
  if (categoriesError)
    return <div>Error fetching categories: {categoriesError.message}</div>;

  return (
    <form
      className="mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-gray-800">
        Create a New Menu Item
      </h2>
      <MenuItemDetailsForm
        details={details}
        setDetails={setDetails}
        categories={categories}
      />
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {isLoading ? "Creating..." : "Create Menu Item"}
      </button>
    </form>
  );
};

export default AdminCreateMenu;
