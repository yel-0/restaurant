import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMenuDelete } from "@/Hook/Menu/useMenuDelete";
export const DeleteMenuItemDialog = ({ item }) => {
  const { mutate: deleteMenuItem, isLoading } = useMenuDelete();

  const handleConfirm = () => {
    deleteMenuItem(item._id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Delete Menu Item</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the menu item:{" "}
            <span className="font-bold">{item.name}</span>? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="text-right">
          <Button variant="outline" className="mr-2" disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
