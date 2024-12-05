import React, { useState } from "react";
import AdminCategorySelector from "@/Design/Admin/AdminCategorySelector";
import AdminMenuItemCard from "@/Design/Admin/AdminMenuItemCard";
import { Link } from "react-router-dom";
const AdminMenu = () => {
  // Static data for menu items
  const menuItems = [
    {
      id: 1,
      name: "Pizza Margherita",
      description: "Classic Italian pizza with fresh mozzarella and basil.",
      price: 12.99,
      stock: 20, // Stock quantity
      image:
        "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 2,
      name: "Spaghetti Carbonara",
      description: "Rich and creamy pasta with bacon and Parmesan cheese.",
      price: 14.99,
      stock: 15, // Stock quantity
      image:
        "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 3,
      name: "Caesar Salad",
      description:
        "Crisp lettuce with creamy dressing, croutons, and Parmesan.",
      price: 8.99,
      stock: 30, // Stock quantity
      image:
        "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 4,
      name: "Grilled Chicken",
      description: "Juicy grilled chicken served with a side of vegetables.",
      price: 16.99,
      stock: 10, // Stock quantity
      image:
        "https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  // State for search term
  const [searchTerm, setSearchTerm] = useState("");

  // Filtering menu items based on search
  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Admin Menu Management</h1>

      {/* Search Box */}
      <div className="mb-6 flex justify-start gap-4 items-center">
        <input
          type="text"
          placeholder="Search menu items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 w-80 border rounded-lg shadow-md focus:outline-none "
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md">
          Search
        </button>
      </div>

      {/* Category Navigation (optional) */}
      <div className="flex flex-row justify-between items-center">
        <AdminCategorySelector />

        <Link
          to="/admin/menu/create"
          className="px-4 py-2 text-sm font-medium rounded mb-6 bg-blue-600 text-white"
        >
          Create
        </Link>
      </div>
      {/* Menu Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <AdminMenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AdminMenu;
