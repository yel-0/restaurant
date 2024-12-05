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

export const DeleteMenuItemDialog = ({
  menuItemId,
  menuItemName,
  onDelete,
}) => {
  const handleConfirm = () => {
    // Perform the delete operation (callback passed via props)
    if (onDelete) onDelete(menuItemId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Menu Item</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the menu item:{" "}
            <span className="font-bold">{menuItemName}</span>? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="text-right">
          <Button variant="outline" className="mr-2">
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
