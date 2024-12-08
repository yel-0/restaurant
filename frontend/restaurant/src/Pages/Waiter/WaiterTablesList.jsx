import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const WaiterTablesList = () => {
  // Sample data for tables
  const tables = [
    { id: 1, tableNumber: "1", isAvailable: true },
    { id: 2, tableNumber: "2", isAvailable: false },
    { id: 3, tableNumber: "3", isAvailable: true },
    { id: 4, tableNumber: "4", isAvailable: false },
    { id: 5, tableNumber: "5", isAvailable: true },
  ];

  // State to manage table availability updates (if needed)
  const [tableStatus, setTableStatus] = useState(tables);

  // Optional: Function to toggle availability (just for demonstration)
  const toggleAvailability = (tableId) => {
    setTableStatus((prevStatus) =>
      prevStatus.map((table) =>
        table.id === tableId
          ? { ...table, isAvailable: !table.isAvailable }
          : table
      )
    );
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Table Availability
      </h1>

      {/* Table list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tableStatus.map((table) => (
          <div
            key={table.id}
            className={`flex flex-col items-center p-6 rounded-lg shadow-md border-2 ${
              table.isAvailable
                ? "bg-green-100 border-green-400"
                : "bg-red-100 border-red-400"
            }`}
          >
            <h2 className="text-xl font-semibold text-gray-700">
              Table {table.tableNumber}
            </h2>
            <p
              className={`mt-2 text-lg font-medium ${
                table.isAvailable ? "text-green-600" : "text-red-600"
              }`}
            >
              {table.isAvailable ? "Available" : "Occupied"}
            </p>

            {/* Button to simulate availability change */}
            <Button
              onClick={() => toggleAvailability(table.id)}
              variant="outline"
              size="sm"
              className={`mt-4 ${
                table.isAvailable
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {table.isAvailable ? "Mark as Occupied" : "Mark as Available"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaiterTablesList;
