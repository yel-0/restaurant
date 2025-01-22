import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useCreateCategory from "@/Hook/Category/useCreateCategory";
import { Button } from "@/components/ui/button";

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

  const handleClose = () => {
    setOpen(false); // Close the dialog without performing any action
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-black text-white hover:opacity-75 p-3 text-sm rounded-md shadow-md">
        Add Category +
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
          <div className="flex justify-end gap-2 mt-4">
            {/* Close button */}
            <Button
              type="button"
              onClick={handleClose}
              className="bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Close
            </Button>
            {/* Create button */}
            <Button onClick={handleCreate} disabled={isLoading} className="">
              {isLoading ? "Creating..." : "Create Category"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;
