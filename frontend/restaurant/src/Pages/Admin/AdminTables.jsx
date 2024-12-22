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
import { UpdateTableDialog } from "@/Design/Admin/UpdateTableDialog";
import { DeleteTableDialog } from "@/Design/Admin/DeleteTableDialog";
import CreateTableDialog from "@/Design/Admin/CreateTableDialog";
import useFetchTables from "@/Hook/Table/useFetchTables";

const AdminTables = () => {
  const [page, setPage] = useState(1);
  const limit = 2; // Define items per page
  const { data, isLoading, isError } = useFetchTables(page, limit);

  const tables = data?.tables || [];
  const totalPages = data?.totalPages || 1; // Get total pages from API response

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading tables</div>;
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

      {/* Pagination Controls */}
      <div className="mt-4 text-center">
        <button
          className="px-4 py-2 border rounded-l-md"
          onClick={handlePrevious}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="px-4">{`Page ${page} of ${totalPages}`}</span>
        <button
          className="px-4 py-2 border rounded-r-md"
          onClick={handleNext}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminTables;
