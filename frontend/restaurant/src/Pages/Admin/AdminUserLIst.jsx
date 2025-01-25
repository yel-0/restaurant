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

const getStatusBadge = (status) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-500  text-white">Active</Badge>;
    case "inactive":
      return <Badge className="bg-red-500 text-white">Inactive</Badge>;

    default:
      return <Badge className="bg-yellow-500 text-white">Unknown</Badge>;
  }
};

const AdminUserList = () => {
  const [roleFilter, setRoleFilter] = useState(""); // Manage role filter state
  const [nameFilter, setNameFilter] = useState(""); // Manage name filter state
  const [tempName, setTempName] = useState(""); // Temporary state for name input
  const [page, setPage] = useState(1); // Manage page state
  const limit = 10; // Number of users per page

  const {
    data: users,
    isLoading,
    isError,
  } = useFetchUsers({
    role: roleFilter,
    name: nameFilter, // Add the name filter
    page,
    limit,
  });

  const handleRoleChange = (value) => {
    if (value === "all") {
      setRoleFilter(""); // Reset role filter when "All Roles" is selected
    } else {
      setRoleFilter(value);
    }
  };

  const handleNameChange = (event) => {
    setTempName(event.target.value); // Update temporary name state
  };

  const handleSearchByName = () => {
    setNameFilter(tempName); // Only update the main name filter when "Search" is clicked
    setPage(1); // Reset to first page when searching by name
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0) {
      setPage(newPage);
    }
  };

  // Function to format the createdAt date into a readable format
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching users.</div>;
  }

  return (
    <div className="py-6 bg-white  rounded-md">
      <h1 className="text-xl font-bold mb-4">View and Manage Users</h1>

      {/* Role filter dropdown */}
      <div className="flex flex-row py-6  justify-between items-center">
        <div className=" flex items-center gap-2">
          <Input
            type="text"
            placeholder="Search by name"
            value={tempName}
            onChange={handleNameChange}
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
          <div className="">
            <Link to="/register">
              <Button>Add + </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Table */}
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
              <TableCell>{user.role} </TableCell>
              <TableCell>{getStatusBadge(user.status)}</TableCell>{" "}
              {/* Updated status badge */}
              <TableCell>{formatDate(user.createdAt)}</TableCell>{" "}
              {/* Format the createdAt date */}
              <TableCell className="text-center gap-3 flex justify-center items-center">
                <UpdateUserDialog user={user} />
                <DeleteUserDialog user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="mt-4 text-center flex flex-row justify-center items-center gap-3">
        <button
          className="px-4 py-2 border rounded-l-md"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <div className="text-center mt-2">
          Page {page} of {users?.totalPages}
        </div>
        <button
          className="px-4 py-2 border rounded-r-md"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === users?.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminUserList;
