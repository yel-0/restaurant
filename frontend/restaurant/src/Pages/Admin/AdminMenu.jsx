import React, { useState, useEffect } from "react";
import AdminMenuItemCard from "@/Design/Admin/AdminMenuItemCard";
import { Link } from "react-router-dom";
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

const AdminMenu = () => {
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
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Admin Menu Management</h1>

      {/* Search Box */}
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
      <div className="flex flex-row justify-between items-center mb-6 py-4">
        <CategorySelector
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Link to="/admin/menu/create">
          <Button>Create +</Button>
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

export default AdminMenu;
