import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useUpdateUser from "@/Hook/Auth/useUpdateUser";
import { Pencil } from "lucide-react";

const UpdateUserDialog = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [status, setStatus] = useState(user.status || "active"); // Add status field

  const [open, setOpen] = useState(false); // Manage dialog open/close state

  const { mutate } = useUpdateUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      name,
      role,
      email,
      password,
      status, // Include status in the update
    };
    mutate(
      { id: user._id, userData: updatedUser },
      {
        onSuccess: () => {
          setOpen(false); // Close the dialog upon successful update
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white shadow-none flex flex-row justify-center items-center border-black border text-black hover:text-gray-700">
          <Pencil /> <div>Edit</div>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
          <DialogDescription>
            Make changes to the user details and click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              placeholder="Enter user name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="user">Select Role</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Waiter">Waiter</option>
              <option value="Cook">Cook</option>
            </select>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              placeholder="Enter user email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password (Leave blank to keep unchanged)
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter new password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              className="bg-gray-200 text-gray-800 hover:bg-gray-300"
              onClick={() => setOpen(false)} // Close dialog on cancel
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserDialog;
