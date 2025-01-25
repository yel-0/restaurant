import React from "react";
import useFetchCategories from "@/Hook/Category/useFetchCategories";
import { Button } from "@/components/ui/button";

const CategorySelector = ({ selectedCategory, setSelectedCategory }) => {
  const { data: categories, isLoading, isError } = useFetchCategories();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading categories.</div>;
  }

  return (
    <div className="flex space-x-4">
      {/* "All" button */}
      <Button
        onClick={() => setSelectedCategory(null)}
        className={`px-4 py-2 text-sm font-medium rounded ${
          !selectedCategory
            ? "bg-black text-white"
            : "bg-gray-200 text-gray-600"
        }`}
      >
        All
      </Button>

      {/* Category buttons */}
      {categories?.map((category) => (
        <Button
          key={category._id}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 text-sm font-medium rounded ${
            selectedCategory?._id === category._id
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategorySelector;
