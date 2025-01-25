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
import { Trash2 } from "lucide-react";

export const DeleteMenuItemDialog = ({ item }) => {
  const { mutate: deleteMenuItem, isLoading } = useMenuDelete();
  const [open, setOpen] = React.useState(false);

  const handleConfirm = () => {
    deleteMenuItem(item._id);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 /> Delete
        </Button>
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
          <Button
            variant="outline"
            className="bg-gray-200 text-gray-800 hover:bg-gray-300 mr-2"
            disabled={isLoading}
            onClick={() => setOpen(false)}
          >
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
