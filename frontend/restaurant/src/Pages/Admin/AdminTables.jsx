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
import CreateTableDialog from "@/Design/Admin/CreateTableDialog";
import useFetchTables from "@/Hook/Table/useFetchTables";
const AdminTables = () => {
  const { data: tables, isLoading, isError } = useFetchTables();

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="p-6 bg-white shadow rounded-md">
      <h1 className="text-xl font-bold mb-4">Table Management</h1>
      <div className="p-4">
        <CreateTableDialog />
      </div>
      <Table>
        <TableCaption>A list of all tables in the restaurant.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Table Number</TableHead>
            <TableHead>Seat</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tables.map((table) => (
            <TableRow key={table._id}>
              <TableCell>{table.tableNumber}</TableCell>
              <TableCell>{table.seats}</TableCell>
              <TableCell>{table.location}</TableCell>
              <TableCell>{table.status}</TableCell>
              <TableCell className="text-center space-x-2">
                <UpdateTableDialog table={table} />
                <DeleteTableDialog tableId={table._id} />
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
