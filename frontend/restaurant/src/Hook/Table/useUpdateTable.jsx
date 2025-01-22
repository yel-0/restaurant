import { useMutation, useQueryClient } from "react-query";
import { useToast } from "@/hooks/use-toast";
import { updateTable } from "@/assets/api/Table";

// Custom hook for updating a table
const useUpdateTable = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(updateTable, {
    onSuccess: () => {
      queryClient.invalidateQueries("tables");
      toast({
        title: "Table updated successfully",
        description: "The table details have been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to update table",
        description:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });
};

export default useUpdateTable;
