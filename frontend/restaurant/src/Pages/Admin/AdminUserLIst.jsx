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

const AdminUserList = () => {
  // Example data for users
  const users = [
    {
      id: 1,
      name: "John Doe",
      role: "Waiter",
      email: "john@example.com",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Cook",
      email: "jane@example.com",
      status: "Active",
    },
    {
      id: 3,
      name: "Mike Brown",
      role: "Admin",
      email: "mike@example.com",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Alice Johnson",
      role: "Waiter",
      email: "alice@example.com",
      status: "Active",
    },
    {
      id: 5,
      name: "Bob Williams",
      role: "Cook",
      email: "bob@example.com",
      status: "Active",
    },
    {
      id: 6,
      name: "Charlie Davis",
      role: "Admin",
      email: "charlie@example.com",
      status: "Inactive",
    },
    {
      id: 7,
      name: "David Lee",
      role: "Waiter",
      email: "david@example.com",
      status: "Active",
    },
    {
      id: 8,
      name: "Emma Wilson",
      role: "Cook",
      email: "emma@example.com",
      status: "Inactive",
    },
    {
      id: 9,
      name: "George Harris",
      role: "Admin",
      email: "george@example.com",
      status: "Active",
    },
    {
      id: 10,
      name: "Hannah Clark",
      role: "Waiter",
      email: "hannah@example.com",
      status: "Inactive",
    },
  ];

  return (
    <div className="p-6 bg-white shadow rounded-md">
      <h1 className="text-xl font-bold mb-4">User List</h1>

      {/* Role filter dropdown */}
      <div className="mb-4">
        <Select>
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
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="text-center">{user.status}</TableCell>
              <TableCell className="text-center">
                <Button className="px-3 py-1 rounded-lg text-sm font-medium text-white bg-blue-500  hover:bg-blue-600 transition">
                  Edit
                </Button>
                <Button className="ml-2 px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination (you can adjust the logic to make it functional) */}
      <div className="mt-4 text-center">
        <button className="px-4 py-2 border rounded-l-md">Previous</button>
        <button className="px-4 py-2 border rounded-r-md">Next</button>
      </div>
    </div>
  );
};

export default AdminUserList;
