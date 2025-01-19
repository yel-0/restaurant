import { useMutation, useQueryClient } from "react-query";
import { updateUser } from "@/assets/api/user";
import { useToast } from "@/hooks/use-toast";

// Custom hook for updating a user
const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(({ id, userData }) => updateUser({ id, userData }), {
    onSuccess: (data) => {
      // Invalidate the query to refetch updated data
      queryClient.invalidateQueries("users");

      // Show success toast
      toast({
        title: "User updated successfully",
        description: "The user's details were updated.",
      });
    },
    onError: (error) => {
      // Show error toast in case of failure
      toast({
        title: "Update failed",
        description: "There was an issue updating the user.",
        variant: "destructive", // Use destructive variant for errors
      });
    },
  });
};

export default useUpdateUser;
