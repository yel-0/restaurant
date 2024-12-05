import React, { useState } from "react";

// Component for uploading an image
const MenuItemImageUpload = ({ image, setImage }) => {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a local preview
      setImage(imageUrl);
    }
  };

  return (
    <div className="mb-6">
      <label
        htmlFor="imageUpload"
        className="block text-sm font-medium text-gray-700"
      >
        Upload Image
      </label>
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        onChange={handleImageUpload}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      />
      {image && (
        <img
          src={image}
          alt="Preview"
          className="mt-4 w-32 h-32 object-cover rounded-lg border border-gray-200"
        />
      )}
    </div>
  );
};

// Component for entering menu item details
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
          htmlFor="basePrice"
          className="block text-sm font-medium text-gray-700"
        >
          Base Price
        </label>
        <input
          type="number"
          id="basePrice"
          name="basePrice"
          value={details.basePrice}
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
          id="availability"
          name="availability"
          checked={details.availability}
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
          htmlFor="preparationTime"
          className="block text-sm font-medium text-gray-700"
        >
          Preparation Time (minutes)
        </label>
        <input
          type="number"
          id="preparationTime"
          name="preparationTime"
          value={details.preparationTime}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

const AdminCreateMenu = () => {
  const [image, setImage] = useState(""); // Stores the image URL
  const [details, setDetails] = useState({
    name: "",
    category: "",
    basePrice: "",
    description: "",
    availability: true,
    preparationTime: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const menuItem = { ...details, image };
    console.log("Form submitted with: ", menuItem);
  };

  return (
    <form
      className=" mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-gray-800">
        Create a New Menu Item
      </h2>
      <MenuItemImageUpload image={image} setImage={setImage} />
      <MenuItemDetailsForm details={details} setDetails={setDetails} />
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Create Menu Item
      </button>
    </form>
  );
};

export default AdminCreateMenu;
