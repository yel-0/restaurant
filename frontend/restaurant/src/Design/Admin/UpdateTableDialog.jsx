import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useUpdateTable from "@/Hook/Table/useUpdateTable";
import { Pencil } from "lucide-react";

export const UpdateTableDialog = ({ table }) => {
  const { mutate: updateTable, isLoading } = useUpdateTable();
  const [formData, setFormData] = useState({
    tableNumber: table.tableNumber,
    seats: table.seats,
    location: table.location,
    status: table.status || "available",
  });
  const [open, setOpen] = useState(false); // Manage dialog open/close state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTable(
      { tableId: table._id, updatedData: formData },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white shadow-none flex flex-row justify-center items-center border-black border text-black hover:text-gray-700">
          <Pencil /> <div>Edit</div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Table</DialogTitle>
          <DialogDescription>
            Update the details for <b>{table.tableNumber}</b>.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Table Number</label>
            <input
              type="text"
              name="tableNumber"
              value={formData.tableNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Seats</label>
            <input
              type="number"
              name="seats"
              value={formData.seats}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="reserved">Reserved</option>
            </select>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              onClick={() => setOpen(false)} // Close the dialog
              className="bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Close
            </Button>
            {/* Save Button */}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
            {/* Close Button */}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
