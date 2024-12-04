import React from "react";
import { Coffee, Pizza, GlassWater, Soup } from "lucide-react"; // Importing icons

const categories = [
  { id: 1, name: "Breakfast", icon: <Coffee /> },
  { id: 2, name: "Lunch", icon: <Pizza /> },
  { id: 3, name: "Drink", icon: <GlassWater /> },
  { id: 4, name: "Soup", icon: <Soup /> },
];

const CategoryList = () => {
  return (
    <div className="bg-white shadow-lg  p-8">
      <ul className="flex flex-wrap justify-center gap-8">
        {categories.map((category) => (
          <li key={category.id} className="text-center group">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 text-blue-600 rounded-full shadow-md transition-transform transform group-hover:scale-110">
              {category.icon}
            </div>
            <span className="text-lg font-semibold text-gray-700 mt-4 block group-hover:text-blue-500">
              {category.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
