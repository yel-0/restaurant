import React, { useState, useEffect } from "react";
import AdminMenuItemCard from "@/Design/Admin/AdminMenuItemCard";
import { Link } from "react-router-dom";
import CategorySelector from "@/Design/Share/CategorySelector";
import { useGetMenus } from "@/Hook/Menu/useGetMenus";

const AdminMenu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState(1);
  const [queryParams, setQueryParams] = useState({
    category: "",
    name: "",
    limit: 10,
    page: 1,
  });

  const { data, isLoading, isError } = useGetMenus(queryParams);

  // Handler for search button click
  const handleSearchClick = () => {
    setQueryParams((prev) => ({
      ...prev,
      name: searchTerm,
      page: 1,
    }));
  };

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      category: selectedCategory ? selectedCategory._id : "",
    }));
  }, [selectedCategory]);

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
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>

      {/* Category Navigation */}
      <div className="flex flex-row justify-between items-center">
        <CategorySelector
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />{" "}
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

      {/* Handle loading and error states */}
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error loading menu items.</div>}
    </div>
  );
};

export default AdminMenu;
