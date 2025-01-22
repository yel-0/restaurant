import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import useDeleteTable from "@/Hook/Table/useDeleteTable";
import { Trash2 } from "lucide-react";

export const DeleteTableDialog = ({ tableId }) => {
  const { mutate: deleteTable, isLoading } = useDeleteTable();
  const [open, setOpen] = useState(false); // State to control dialog visibility

  const handleDelete = () => {
    deleteTable(tableId);
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog on cancel
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 /> <div>Delete</div>
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[700px]">
        <DialogHeader>
          <DialogTitle>Delete Table</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete table with ID: {tableId}? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="text-right flex justify-end gap-2">
          <Button
            variant="outline"
            className="bg-gray-200 text-gray-800 hover:bg-gray-300"
            onClick={handleClose} // Close the dialog without any action
          >
            Close
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
