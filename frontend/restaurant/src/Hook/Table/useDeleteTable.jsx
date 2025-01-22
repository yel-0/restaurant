import { useMutation, useQueryClient } from "react-query";
import { deleteTable } from "@/assets/api/Table";
import { useToast } from "@/hooks/use-toast";

// Custom hook for deleting a table
const useDeleteTable = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(deleteTable, {
    onSuccess: () => {
      queryClient.invalidateQueries("tables");

      toast({
        title: "Table deleted successfully",
        description: "The selected table has been removed from the system.",
      });
    },

    onError: (error) => {
      toast({
        title: "Failed to delete table",
        description:
          error?.message || "Could not remove the table. Please try again.",
        variant: "destructive",
      });
    },
  });
};

export default useDeleteTable;
