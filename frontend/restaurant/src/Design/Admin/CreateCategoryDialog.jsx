import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import useCreateCategory from "@/Hook/Category/useCreateCategory";
const CreateCategoryDialog = () => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const {
    mutate: createCategory,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useCreateCategory();

  const handleCreate = () => {
    if (name.trim()) {
      createCategory({ name });
      setName("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-blue-500 text-white hover:opacity-75 p-5 lg:py-1 lg:px-2 text-sm rounded-md shadow-md">
        Add Category
      </DialogTrigger>
      <DialogContent className="w-[90%] lg:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 mt-4">
          <label className="text-gray-600">Category Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="border border-gray-300 rounded-md p-2 outline-none transition"
          />
          <button
            onClick={handleCreate}
            disabled={isLoading}
            className="bg-blue-500 text-white py-2 rounded-md mt-4 hover:opacity-75 transition"
          >
            {isLoading ? "Creating..." : "Create Category"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;
