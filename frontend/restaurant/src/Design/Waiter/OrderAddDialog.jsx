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

const OrderAddDialog = ({ onAddItem }) => {
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

  const handleAddNewItem = (item) => {
    console.log(item);

    onAddItem(item); // Pass the added item to the parent component
  };

  return (
    <Dialog>
      <DialogTrigger className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md">
        Add New Order
      </DialogTrigger>
      <DialogContent className="h-[500px] overflow-scroll ">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Search and select a product to add it to the order.
          </DialogDescription>
        </DialogHeader>
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
          <div className="flex flex-row justify-start items-center flex-wrap gap-6">
            {data?.menuItems.map((item) => (
              <WaiterMenuItemForOrderAdd
                key={item._id}
                item={item}
                onAdd={handleAddNewItem}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderAddDialog;
