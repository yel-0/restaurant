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
import useCreateTable from "@/Hook/Table/useCreateTable";
const CreateTableDialog = () => {
  const [tableData, setTableData] = useState({
    tableNumber: "",
    seats: "",
    status: "available",
    location: "",
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTableData({ ...tableData, [name]: value });
  };

  // Use the custom hook for creating a table
  const { mutate: createTable, isLoading, isError, error } = useCreateTable();

  // Submit handler for the form
  const handleSubmit = (e) => {
    e.preventDefault();
    createTable(tableData);
    setTableData({
      tableNumber: "",
      seats: "",
      status: "available",
      location: "",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="">Create Table +</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Table</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new table.
          </DialogDescription>
        </DialogHeader>

        {/* Form for creating a table */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Table Number</label>
            <input
              type="number"
              name="tableNumber"
              value={tableData.tableNumber}
              onChange={handleChange}
              placeholder="Enter table number"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Seats</label>
            <input
              type="number"
              name="seats"
              value={tableData.seats}
              onChange={handleChange}
              placeholder="Enter number of seats"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={tableData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="reserved">Reserved</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={tableData.location}
              onChange={handleChange}
              placeholder="Enter table location"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="text-right">
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>

        {/* Show error message if there's any issue with the mutation */}
        {isError && (
          <div className="text-red-500 mt-4">
            Error: {error?.message || "Something went wrong."}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateTableDialog;
