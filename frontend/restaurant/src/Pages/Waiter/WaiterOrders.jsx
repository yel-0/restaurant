import React, { useState, useEffect } from "react";
import WaiterMenuItemCard from "@/Design/Waiter/WaiterMenuItemCard";
import WaiterOrderSummary from "@/Pages/Waiter/WaiterOrderSummary";
import CategorySelector from "@/Design/Share/CategorySelector";
import { useGetMenus } from "@/Hook/Menu/useGetMenus";

const WaiterOrders = () => {
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
    <div className="p-4  mx-auto bg-white shadow-lg rounded-xl border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Menu Items</h1>

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
        />
      </div>
      <div className="flex flex-row justify-center items-start">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.menuItems?.map((item) => (
            <WaiterMenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WaiterOrders;
