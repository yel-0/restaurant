import { useMutation, useQueryClient } from "react-query";
import { deleteUser } from "@/assets/api/user";
// Custom hook for deleting a user
const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteUser, {
    onSuccess: (data) => {
      // Optionally invalidate the "users" query to refetch updated data
      queryClient.invalidateQueries("users");

      // Success message
      alert("User deleted successfully");
    },
    onError: (error) => {
      // Handle error and show error message
      alert("Failed to delete user");
    },
  });
};

export default useDeleteUser;
