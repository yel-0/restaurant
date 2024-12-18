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

const AdminUserList = () => {
  const [roleFilter, setRoleFilter] = useState(""); // Manage role filter state
  const [page, setPage] = useState(1); // Manage page state
  const limit = 10; // Number of users per page

  const {
    data: users,
    isLoading,
    isError,
  } = useFetchUsers({
    role: roleFilter,
    page,
    limit,
  });

  const handleRoleChange = (e) => {
    setRoleFilter(e.target.value);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0) {
      setPage(newPage);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching users.</div>;
  }

  return (
    <div className="p-6 bg-white shadow rounded-md">
      <h1 className="text-xl font-bold mb-4">User List</h1>

      {/* Role filter dropdown */}
      <div className="mb-4">
        <Select onValueChange={handleRoleChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="waiter">Waiter</SelectItem>
            <SelectItem value="cook">Cook</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Table>
        <TableCaption>A list of all registered users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.users?.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="text-center gap-3 flex justify-center items-center">
                <UpdateUserDialog user={user} />
                <DeleteUserDialog user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="mt-4 text-center">
        <button
          className="px-4 py-2 border rounded-l-md"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 border rounded-r-md"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === users?.totalPages}
        >
          Next
        </button>
      </div>
      <div className="text-center mt-2">
        Page {page} of {users?.totalPages}
      </div>
    </div>
  );
};

export default AdminUserList;
