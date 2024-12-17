import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

// Function to update a menu item
const updateMenuItem = async ({ menuItemId, updatedData }) => {
  const response = await axios.put(
    `http://localhost:3005/api/menu-items/${menuItemId}`,
    updatedData
  );
  return response.data;
};

// Custom hook for updating a menu item
const useUpdateMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation(updateMenuItem, {
    onSuccess: () => {
      alert("success");
      queryClient.invalidateQueries("menu-items");
    },
    onError: (error) => {
      console.error("Failed to update menu item:", error);
    },
  });
};

export default useUpdateMenuItem;
