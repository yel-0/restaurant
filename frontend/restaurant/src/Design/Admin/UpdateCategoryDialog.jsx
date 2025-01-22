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
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const handleClose = () => {
    setOpen(false); // Close the dialog without performing any action
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="bg-white shadow-none flex flex-row justify-center items-center border-black border text-black hover:text-gray-700">
          <Pencil /> <div>Edit</div>
        </Button>
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
          <div className="flex justify-end gap-2 mt-4">
            {/* Close button */}
            <Button
              type="button"
              onClick={handleClose}
              className="bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Close
            </Button>
            {/* Save Changes button */}
            <Button onClick={handleUpdate} disabled={isLoading}>
              {isLoading ? "Updating..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCategoryDialog;
