import React, { useState, useEffect } from "react";
import WaiterMenuItemCard from "@/Design/Waiter/WaiterMenuItemCard";
import CategorySelector from "@/Design/Share/CategorySelector";
import { useGetMenus } from "@/Hook/Menu/useGetMenus";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const WaiterOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState(1);
  const [queryParams, setQueryParams] = useState({
    category: "",
    name: "",
    limit: 8,
    page: 1,
  });

  const { data, isLoading, isError } = useGetMenus(queryParams);
  const totalPages = data?.totalPages || 1;
  const totalItems = data?.totalItems || 0;

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

  return (
    <div className="">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Menu Items</h1>

      {/* Search Input */}
      <div className="mb-6 flex justify-start gap-4 items-center">
        <Input
          type="text"
          placeholder="Search menu items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-5"
        />
        <Button onClick={handleSearchClick}>Search</Button>
      </div>

      {/* Category Navigation */}
      <div className="flex flex-row justify-between items-center mb-6">
        <CategorySelector
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {/* Menu Items */}
      <div className="">
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

      {/* Pagination */}
      <div className="flex justify-center select-none items-center mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={page === index + 1}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {totalPages > 5 && <PaginationEllipsis />}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page >= totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default WaiterOrders;
