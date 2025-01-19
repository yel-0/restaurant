import { useMutation, useQueryClient } from "react-query";
import { deleteUser } from "@/assets/api/user";
import { useToast } from "@/hooks/use-toast";
// Custom hook for deleting a user
const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(deleteUser, {
    onSuccess: (data) => {
      // Optionally invalidate the "users" query to refetch updated data
      queryClient.invalidateQueries("users");

      toast({
        title: "User deleted successfully",
        description: "The user has been removed from the system.",
      });
    },
    onError: (error) => {
      // Handle error and show error message
      toast({
        title: "Deletion failed",
        description: "There was an issue with deleting the user.",
        variant: "destructive",
      });
    },
  });
};

export default useDeleteUser;
