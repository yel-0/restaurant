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
import useDeleteTable from "@/Hook/Table/useDeleteTable";

export const DeleteTableDialog = ({ tableId }) => {
  const { mutate: deleteTable, isLoading } = useDeleteTable();

  const handleDelete = () => {
    deleteTable(tableId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Table</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete table with ID: {tableId}? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="text-right">
          <Button variant="outline" className="mr-2">
            Cancel
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
