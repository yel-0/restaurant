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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const getStatusBadge = (status) => {
  switch (status) {
    case "available":
      return <Badge className="bg-green-500 text-white">Available</Badge>;
    case "occupied":
      return <Badge className="bg-red-500 text-white">Occupied</Badge>;
    case "reserved":
      return <Badge className="bg-yellow-500 text-white">Reserved</Badge>;
    default:
      return <Badge className="bg-gray-500 text-white">Unknown</Badge>;
  }
};

const AdminTables = () => {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState(""); // Temporary state for input
  const [search, setSearch] = useState(""); // Final search state for API call
  const limit = 10; // Items per page
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
    <div className="">
      <h1 className="text-xl font-bold mb-4">Table Management</h1>

      {/* Search Bar */}
      <div className="mb-4 flex items-center space-x-2">
        <Input
          className="py-5"
          type="text"
          placeholder="Search by Table Number"
          value={searchInput}
          onChange={handleSearchChange}
        />
        <Button className=" text-white" onClick={handleSearchClick}>
          Search
        </Button>
        <div className="p-4">
          <CreateTableDialog />
        </div>
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
              <TableCell>Table {table.tableNumber}</TableCell>
              <TableCell>{table.seats}</TableCell>
              <TableCell>{table.location}</TableCell>
              <TableCell>{getStatusBadge(table.status)}</TableCell>
              <TableCell className="text-center gap-3 flex justify-center items-center">
                <UpdateTableDialog table={table} />
                <DeleteTableDialog tableId={table._id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center select-none">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePrevious}
                disabled={page === 1}
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={page === index + 1}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {totalPages > 5 && <PaginationEllipsis />}

            <PaginationItem>
              <PaginationNext
                onClick={handleNext}
                disabled={page === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default AdminTables;
