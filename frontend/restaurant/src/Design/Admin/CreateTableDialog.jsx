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

export const CreateTableDialog = ({ onCreate }) => {
  const [tableData, setTableData] = useState({
    name: "",
    capacity: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTableData({ ...tableData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onCreate) onCreate(tableData);
    console.log("New Table Created:", tableData);
    setTableData({ name: "", capacity: "", location: "" }); // Reset form
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500 text-white hover:bg-green-600">
          Create Table
        </Button>
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
            <label className="block text-sm font-medium">Table Name</label>
            <input
              type="text"
              name="name"
              value={tableData.name}
              onChange={handleChange}
              placeholder="Enter table name"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Capacity</label>
            <input
              type="number"
              name="capacity"
              value={tableData.capacity}
              onChange={handleChange}
              placeholder="Enter table capacity"
              className="w-full p-2 border rounded-md"
              required
            />
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
            />
          </div>
          <div className="text-right">
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
