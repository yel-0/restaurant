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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import UpdateUserDialog from "@/Design/Admin/UpdateUserDialog";
import DeleteUserDialog from "@/Design/Admin/DeleteUserDialog";
import useFetchUsers from "@/Hook/Auth/useFetchUsers";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
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
    case "active":
      return <Badge className="bg-green-500 text-white">Active</Badge>;
    case "inactive":
      return <Badge className="bg-red-500 text-white">Inactive</Badge>;
    default:
      return <Badge className="bg-yellow-500 text-white">Unknown</Badge>;
  }
};

const AdminUserList = () => {
  const [roleFilter, setRoleFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [tempName, setTempName] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: users,
    isLoading,
    isError,
  } = useFetchUsers({
    role: roleFilter,
    name: nameFilter,
    page,
    limit,
  });

  const handleRoleChange = (value) => {
    setRoleFilter(value === "all" ? "" : value);
  };

  const handleSearchByName = () => {
    setNameFilter(tempName);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= users?.totalPages) {
      setPage(newPage);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while fetching users.</div>;

  return (
    <div className="py-6 bg-white rounded-md">
      <h1 className="text-xl font-bold mb-4">View and Manage Users</h1>
      <div className="flex flex-row py-6 justify-between items-center">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Search by name"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            className="border p-2 rounded-md w-[300px]"
          />
          <Button onClick={handleSearchByName}>Search</Button>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <Select onValueChange={handleRoleChange}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="User">User</SelectItem>
              <SelectItem value="Waiter">Waiter</SelectItem>
              <SelectItem value="Cook">Cook</SelectItem>
            </SelectContent>
          </Select>
          <Link to="/register">
            <Button>Add +</Button>
          </Link>
        </div>
      </div>
      <Table>
        <TableCaption>A list of all registered users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.users?.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{getStatusBadge(user.status)}</TableCell>
              <TableCell>{formatDate(user.createdAt)}</TableCell>
              <TableCell className="text-center gap-3 flex justify-center items-center">
                <UpdateUserDialog user={user} />
                <DeleteUserDialog user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            />
          </PaginationItem>
          {[...Array(users?.totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => handlePageChange(index + 1)}
                isActive={page === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(page + 1)}
              disabled={page === users?.totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AdminUserList;
