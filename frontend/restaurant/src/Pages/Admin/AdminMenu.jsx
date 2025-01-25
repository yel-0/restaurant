import React, { useState, useEffect } from "react";
import AdminMenuItemCard from "@/Design/Admin/AdminMenuItemCard";
import { Link } from "react-router-dom";
import CategorySelector from "@/Design/Share/CategorySelector";
import { useGetMenus } from "@/Hook/Menu/useGetMenus";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AdminMenu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState(1);
  const [queryParams, setQueryParams] = useState({
    category: "",
    name: "",
    limit: 3,
    page: 1,
  });

  const { data, isLoading, isError } = useGetMenus(queryParams);

  const handleSearchClick = () => {
    setQueryParams((prev) => ({
      ...prev,
      name: searchTerm,
      page: 1,
    }));
    setPage(1); // Reset page on search
  };

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      category: selectedCategory ? selectedCategory._id : "",
      page: 1,
    }));
    setPage(1); // Reset page on category change
  }, [selectedCategory]);

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      page,
    }));
  }, [page]);

  const handleNextPage = () => {
    if (data?.menuItems.length === queryParams.limit) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Admin Menu Management</h1>

      {/* Search Box */}
      <div className="mb-6 flex justify-start gap-4 items-center">
        <Input
          type="text"
          placeholder="Search menu items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-5  "
        />
        <Button onClick={handleSearchClick}>Search</Button>
      </div>

      {/* Category Navigation */}
      <div className="flex flex-row justify-between items-center mb-6">
        <CategorySelector
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Link to="/admin/menu/create">
          <Button>Create + </Button>
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

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md disabled:opacity-50"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">Page {page}</span>
        <button
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md disabled:opacity-50"
          onClick={handleNextPage}
          disabled={data?.menuItems.length < queryParams.limit}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminMenu;
