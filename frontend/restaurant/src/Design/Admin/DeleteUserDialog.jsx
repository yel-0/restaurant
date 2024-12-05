import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteUserDialog = () => {
  // Static user data for the dialog
  const user = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
  };

  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button className="bg-red-500 text-white hover:bg-red-600">
          Delete
        </Button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this user? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        {/* User Information */}
        <div className="my-4 text-sm text-gray-700">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
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
            type="button"
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserDialog;
