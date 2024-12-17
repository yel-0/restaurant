import React from "react";
import useFetchCategories from "@/Hook/Category/useFetchCategories";

const CategorySelector = ({ selectedCategory, setSelectedCategory }) => {
  const { data: categories, isLoading, isError } = useFetchCategories();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading categories.</div>;
  }

  return (
    <div className="flex space-x-4 mb-6">
      {/* "All" button */}
      <button
        onClick={() => setSelectedCategory(null)}
        className={`px-4 py-2 text-sm font-medium rounded ${
          !selectedCategory
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-600"
        }`}
      >
        All
      </button>

      {/* Category buttons */}
      {categories?.map((category) => (
        <button
          key={category._id}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 text-sm font-medium rounded ${
            selectedCategory?._id === category._id
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
