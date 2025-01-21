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
    status: table.status || "available", // Default status
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTable({ tableId: table._id, updatedData: formData });
  };

  return (
    <Dialog>
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
          <div className="text-right">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-green-500 text-white hover:bg-green-600"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
