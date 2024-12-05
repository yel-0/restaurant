import React, { useState } from "react";

const AdminCategorySelector = () => {
  const categories = ["All", "Beverages", "Snacks", "Main Course", "Desserts"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="flex space-x-4 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 text-sm font-medium rounded ${
            selectedCategory === category
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default AdminCategorySelector;
