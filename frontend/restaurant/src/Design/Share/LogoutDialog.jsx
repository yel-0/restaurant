import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Adjust import path as needed
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
const LogoutDialog = () => {
  const [open, setOpen] = useState(false); // State to control dialog visibility
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem("token");

    // Show success toast notification
    toast({
      title: "Logout Successful",
      description:
        "You have logged out successfully and will be redirected to the login page.",
    });

    // Navigate to login page after logout
    navigate("/login");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-black">Logout</button>
      </DialogTrigger>

      <DialogContent className="w-[600px]">
        <DialogHeader>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to log out? You will be redirected to the
            login page.
          </DialogDescription>
        </DialogHeader>

        {/* Cancel Button */}
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={() => setOpen(false)} // Close dialog when cancel is clicked
            className="px-4 py-2 bg-gray-300 text-black rounded-lg"
          >
            Cancel
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Logout
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutDialog;
