import React, { useState } from "react";
import AdminMenuItemCard from "@/Design/Admin/AdminMenuItemCard";
import { Link } from "react-router-dom";
import CategorySelector from "@/Design/Share/CategorySelector";
import { useGetMenus } from "@/Hook/Menu/useGetMenus";
const AdminMenu = () => {
  const { data, isLoading, error, isError } = useGetMenus({
    category: "",
    name: "",
    limit: 10,
    page: 1,
  });

  // State for search term
  const [searchTerm, setSearchTerm] = useState("");

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
        <CategorySelector />

        <Link
          to="/admin/menu/create"
          className="px-4 py-2 text-sm font-medium rounded mb-6 bg-blue-600 text-white"
        >
          Create
        </Link>
      </div>
      {/* Menu Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.menuItems.map((item) => (
          <AdminMenuItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AdminMenu;
