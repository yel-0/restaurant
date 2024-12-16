import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import useDeleteCategory from "@/Hook/Category/useDeleteCategory";
import { useQueryClient } from "react-query";
import { useToast } from "@/hooks/use-toast";
const DeleteCategoryConfirmationDialog = ({ category }) => {
  const [open, setOpen] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: deleteCategory,
    isLoading,
    isSuccess,
  } = useDeleteCategory({
    onSuccess: (data) => {
      queryClient.invalidateQueries(["categories"]);

      toast({
        title: "Category deleted successfully",
        description: "The category has been removed from the list.",
      });

      setOpen(false);
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "Deletion failed",
        description:
          "There was an error deleting the category. Please try again.",
      });
    },
  });

  const handleDelete = () => {
    deleteCategory(category._id); // Use category.id for deletion
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-red-500 text-white hover:bg-red-600 py-1 px-2 text-sm rounded-md">
        Delete
      </DialogTrigger>
      <DialogContent className="w-[90%] lg:max-w-lg rounded-lg">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            category and remove its data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-700 text-white rounded px-4 py-2"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
        {isSuccess && (
          <p className="text-green-500 mt-3">Category deleted successfully!</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCategoryConfirmationDialog;
