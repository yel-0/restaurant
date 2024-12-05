import React from "react";
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

const UpdateUserDialog = () => {
  // Static user data for the dialog
  const user = {
    id: 1,
    name: "John Doe",
    role: "Waiter",
    email: "john@example.com",
    status: "Active",
  };

  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white hover:bg-blue-600">
          Update
        </Button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
          <DialogDescription>
            Make changes to the user details and click save when you're done.
          </DialogDescription>
        </DialogHeader>

        {/* Update User Form */}
        <form className="space-y-4">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              placeholder="Enter user name"
              defaultValue={user.name}
              className="mt-1"
            />
          </div>

          {/* Role Input */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium">
              Role
            </label>
            <Input
              id="role"
              placeholder="Enter user role"
              defaultValue={user.role}
              className="mt-1"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              placeholder="Enter user email"
              defaultValue={user.email}
              className="mt-1"
            />
          </div>

          {/* Status Input */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium">
              Status
            </label>
            <Input
              id="status"
              placeholder="Enter user status"
              defaultValue={user.status}
              className="mt-1"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              className="bg-gray-200 text-gray-800 hover:bg-gray-300"
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
