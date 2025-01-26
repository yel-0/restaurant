import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CategorySelector from "../Share/CategorySelector";
import WaiterMenuItemForOrderAdd from "./WaiterMenuItemForOrderAdd";
import { useGetMenus } from "@/Hook/Menu/useGetMenus";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const OrderAddDialog = ({ onAddItem }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [queryParams, setQueryParams] = useState({
    category: "",
    name: "",
    limit: 10,
    page: 1,
  });

  const { data, isLoading, isError } = useGetMenus(queryParams);
  const totalPages = data?.totalPages || 1;

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      page,
    }));
  }, [page]);

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      category: selectedCategory ? selectedCategory._id : "",
      page: 1, // Reset to first page when category changes
    }));
  }, [selectedCategory]);

  const handleSearchClick = () => {
    setQueryParams((prev) => ({
      ...prev,
      name: searchTerm,
      page: 1, // Reset to first page on search
    }));
  };

  const handleAddNewItem = (item) => {
    onAddItem(item);
    toast({
      title: "Item Added",
      description: `${item.name} has been added successfully.`,
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="px-4 py-2 bg-black text-white rounded-lg">
        Add New Order
      </DialogTrigger>
      <DialogContent className="h-[700px] w-[1400px] overflow-scroll">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Search and select a product to add it to the order.
          </DialogDescription>
        </DialogHeader>

        <div className="mb-6 flex justify-start gap-4 items-center">
          <Input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2"
          />
          <Button
            className="px-4 py-2 bg-black text-white rounded-lg shadow-md"
            onClick={handleSearchClick}
          >
            Search
          </Button>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-row justify-between items-center">
          <CategorySelector
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {/* Menu Items */}
        <div className="flex flex-row justify-center items-center">
          <div className="flex flex-row justify-center items-center flex-wrap gap-6">
            {data?.menuItems.map((item) => (
              <WaiterMenuItemForOrderAdd
                key={item._id}
                item={item}
                onAdd={handleAddNewItem}
              />
            ))}
          </div>
        </div>

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
      </DialogContent>
    </Dialog>
  );
};

export default OrderAddDialog;
