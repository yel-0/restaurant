import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// WaiterTablesList Component
const WaiterTablesList = () => {
  // Sample data for tables, including their location and availability
  const [tables, setTables] = useState([
    { id: 1, tableNumber: "1", isAvailable: true, location: "Near the window" },
    { id: 2, tableNumber: "2", isAvailable: false, location: "Near the bar" },
    { id: 3, tableNumber: "3", isAvailable: true, location: "Outdoor seating" },
    { id: 4, tableNumber: "4", isAvailable: false, location: "Near the stage" },
    { id: 5, tableNumber: "5", isAvailable: true, location: "By the entrance" },
  ]);

  // Toggle table availability
  const toggleAvailability = (tableId) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId
          ? { ...table, isAvailable: !table.isAvailable }
          : table
      )
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-xl border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Tables Availability
      </h1>

      <Table>
        <TableCaption>
          A list of tables with their availability status
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Table Number</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tables.map((table) => (
            <TableRow key={table.id}>
              <TableCell>{table.tableNumber}</TableCell>
              <TableCell>{table.location}</TableCell>
              <TableCell>
                <span
                  className={`${
                    table.isAvailable ? "text-green-600" : "text-red-600"
                  } font-semibold`}
                >
                  {table.isAvailable ? "Available" : "Occupied"}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => toggleAvailability(table.id)}
                  variant="outline"
                  size="sm"
                  className={`${
                    table.isAvailable
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {table.isAvailable ? "Mark as Occupied" : "Mark as Available"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WaiterTablesList;
