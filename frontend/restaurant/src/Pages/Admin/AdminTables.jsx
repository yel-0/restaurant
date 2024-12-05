import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UpdateTableDialog } from "@/Design/Admin/UpdateTableDialog";
import { DeleteTableDialog } from "@/Design/Admin/DeleteTableDialog";
const AdminTables = () => {
  // Example data for tables
  const tables = [
    {
      id: 1,
      name: "Table 1",
      capacity: 4,
      location: "Patio",
      status: "Available",
    },
    {
      id: 2,
      name: "Table 2",
      capacity: 6,
      location: "Main Hall",
      status: "Occupied",
    },
    {
      id: 3,
      name: "Table 3",
      capacity: 2,
      location: "Patio",
      status: "Reserved",
    },
    {
      id: 4,
      name: "Table 4",
      capacity: 8,
      location: "Private Room",
      status: "Available",
    },
    {
      id: 5,
      name: "Table 5",
      capacity: 10,
      location: "Main Hall",
      status: "Occupied",
    },
  ];

  return (
    <div className="p-6 bg-white shadow rounded-md">
      <h1 className="text-xl font-bold mb-4">Table Management</h1>

      <Table>
        <TableCaption>A list of all tables in the restaurant.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tables.map((table) => (
            <TableRow key={table.id}>
              <TableCell className="font-medium">{table.id}</TableCell>
              <TableCell>{table.name}</TableCell>
              <TableCell>{table.capacity}</TableCell>
              <TableCell>{table.location}</TableCell>
              <TableCell>{table.status}</TableCell>
              <TableCell className="text-center space-x-2">
                <UpdateTableDialog table={table} />
                <DeleteTableDialog tableId={table.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Optional Pagination */}
      <div className="mt-4 text-center">
        <button className="px-4 py-2 border rounded-l-md">Previous</button>
        <button className="px-4 py-2 border rounded-r-md">Next</button>
      </div>
    </div>
  );
};

export default AdminTables;
