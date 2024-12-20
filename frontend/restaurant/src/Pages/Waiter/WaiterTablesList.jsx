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
import useFetchTables from "@/Hook/Table/useFetchTables";

// WaiterTablesList Component
const WaiterTablesList = () => {
  const { data, isLoading, isError } = useFetchTables();

  if (isLoading) {
    return <div>loading ...</div>;
  }

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
          {data?.map((table) => (
            <TableRow key={table._id}>
              <TableCell>{table.tableNumber}</TableCell>
              <TableCell>{table.location}</TableCell>
              <TableCell>
                <span
                  className={`${
                    table.status ? "text-green-600" : "text-red-600"
                  } font-semibold`}
                >
                  {table.status ? "Available" : "Occupied"}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => toggleAvailability(table._id)}
                  variant="outline"
                  size="sm"
                  className={`${
                    table.status
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {table.status ? "Mark as Occupied" : "Mark as Available"}
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
