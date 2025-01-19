import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useDeleteUser from "@/Hook/Auth/useDeleteUser";
import { Trash2 } from "lucide-react";

const DeleteUserDialog = ({ user }) => {
  const { mutate } = useDeleteUser(); // Hook for deleting the user
  const [open, setOpen] = useState(false); // State to control dialog visibility

  const handleDelete = () => {
    // Call the delete function from the custom hook with the user's ID
    mutate(user._id);
    setOpen(false); // Close the dialog after deletion
  };

  const handleCancel = () => {
    setOpen(false); // Close the dialog on cancel
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button
          className="bg-red-500 text-white hover:bg-red-600"
          onClick={() => setOpen(true)}
        >
          <Trash2 /> <div>Delete</div>
        </Button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="w-[600px]">
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
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="bg-red-500 text-white hover:bg-red-600 "
            onClick={handleDelete} // Trigger the delete process
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserDialog;
