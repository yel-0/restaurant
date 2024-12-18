import { useMutation, useQueryClient } from "react-query";
import { updateUser } from "@/assets/api/user";
// Custom hook for updating a user
const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(updateUser, {
    onSuccess: (data) => {
      // Optionally invalidate the "users" query to refetch updated data
      queryClient.invalidateQueries("users");

      // Success message
      alert("User updated successfully");
    },
    onError: (error) => {
      // Handle error and show error message
      alert("Failed to update user");
    },
  });
};

export default useUpdateUser;
