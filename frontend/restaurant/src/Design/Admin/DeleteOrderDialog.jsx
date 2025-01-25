import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"; // Adjust import based on your UI library
import useDeleteOrder from "@/Hook/Order/useDeleteOrder";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
const DeleteOrderDialog = ({ orderId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: deleteOrder, isLoading, isError, error } = useDeleteOrder();

  const handleDelete = () => {
    deleteOrder(orderId, {
      onSuccess: () => {
        setIsOpen(false); // Close the dialog on success
      },
      onError: (err) => {
        setIsOpen(false); // Close the dialog on error
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button variant="destructive">
          <Trash2 /> Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[600px]">
        <DialogTitle>Delete Order</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this order? This action cannot be
          undone.
        </DialogDescription>
        <DialogFooter>
          <Button
            onClick={() => setIsOpen(false)}
            className="bg-gray-200 text-gray-800 hover:bg-gray-300"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            className="delete-button"
            disabled={isLoading}
            variant="destructive"
          >
            {isLoading ? "Deleting..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteOrderDialog;
