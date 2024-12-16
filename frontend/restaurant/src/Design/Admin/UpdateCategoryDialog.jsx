import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useUpdateCategory from "@/Hook/Category/useUpdateCategory";
import { useQueryClient } from "react-query";
import { useToast } from "@/hooks/use-toast";
const UpdateCategoryDialog = ({ category }) => {
  const [name, setName] = useState(category.name);
  const [open, setOpen] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    mutate: updateCategory,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useUpdateCategory({
    onSuccess: (data) => {
      queryClient.invalidateQueries(["categories"]);

      toast({
        title: "Category updated successfully",
        description: "The category has been updated. Changes are now live!",
      });

      setOpen(false);
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "Update failed",
        description:
          "There was an error updating the category. Please try again.",
      });
    },
  });

  const handleUpdate = () => {
    if (name.trim()) {
      updateCategory({ id: category._id, name });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-blue-500 text-white hover:bg-blue-600 py-1 px-2 text-sm rounded-md shadow-md">
        Update
      </DialogTrigger>
      <DialogContent className="w-[90%] lg:max-w-lg rounded-lg">
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 mt-4">
          <label className="text-gray-600">Category Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500 transition"
          />
          <button
            onClick={handleUpdate}
            disabled={isLoading}
            className="bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 transition"
          >
            {isLoading ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCategoryDialog;
