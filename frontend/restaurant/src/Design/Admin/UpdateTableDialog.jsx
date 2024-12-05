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

export const UpdateTableDialog = ({ table }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white hover:bg-blue-600">
          Update
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Table</DialogTitle>
          <DialogDescription>
            Update the details for <b>{table.name}</b>.
          </DialogDescription>
        </DialogHeader>
        {/* Form for updating table details */}
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium">Table Name</label>
            <input
              type="text"
              defaultValue={table.name}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Capacity</label>
            <input
              type="number"
              defaultValue={table.capacity}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Location</label>
            <input
              type="text"
              defaultValue={table.location}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="text-right">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
