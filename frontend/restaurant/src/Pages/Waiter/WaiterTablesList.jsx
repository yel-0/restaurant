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

import CreateTableDialog from "@/Design/Admin/CreateTableDialog";
import useFetchTables from "@/Hook/Table/useFetchTables";

const WaiterTableList = () => {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState(""); // Temporary state for input
  const [search, setSearch] = useState(""); // Final search state for API call
  const limit = 4; // Items per page
  const { data, isLoading, isError } = useFetchTables(page, limit, search);

  const tables = data?.tables || [];
  const totalPages = data?.totalPages || 1;

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    // Allow only integers in the input field
    if (/^\d*$/.test(value)) {
      setSearchInput(value);
    }
  };

  const handleSearchClick = () => {
    setSearch(searchInput); // Update the search state
    setPage(1); // Reset to the first page when searching
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading tables</div>;

  return (
    <div className="p-6 bg-white shadow rounded-md">
      <h1 className="text-xl font-bold mb-4">Table Management</h1>

      {/* Search Bar */}
      <div className="mb-4 flex items-center space-x-2">
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Search by Table Number"
          value={searchInput}
          onChange={handleSearchChange}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>

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
              <TableCell className="text-center space-x-2">Mark</TableCell>
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

export default WaiterTableList;
