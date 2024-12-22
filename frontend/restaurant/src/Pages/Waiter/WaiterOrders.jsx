import React, { useState, useEffect } from "react";
import WaiterMenuItemCard from "@/Design/Waiter/WaiterMenuItemCard";
import CategorySelector from "@/Design/Share/CategorySelector";
import { useGetMenus } from "@/Hook/Menu/useGetMenus";

const WaiterOrders = () => {
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
    setPage(1); // Reset to the first page
  };

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      category: selectedCategory ? selectedCategory._id : "",
      page: 1,
    }));
    setPage(1); // Reset to the first page on category change
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
    <div className="p-4 mx-auto bg-white shadow-lg rounded-xl border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Menu Items</h1>

      {/* Search Input */}
      <div className="mb-6 flex justify-start gap-4 items-center">
        <input
          type="text"
          placeholder="Search menu items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 w-80 border rounded-lg shadow-md focus:outline-none"
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>

      {/* Category Navigation */}
      <div className="flex flex-row justify-between items-center mb-6">
        <CategorySelector
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {/* Menu Items */}
      <div className="flex flex-row justify-center items-start">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.menuItems.map((item) => (
            <WaiterMenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Loading and Error States */}
      {isLoading && <div className="mt-6">Loading...</div>}
      {isError && (
        <div className="mt-6 text-red-500">Error loading menu items.</div>
      )}

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

export default WaiterOrders;
