import { useMutation, useQueryClient } from "react-query";
import { useToast } from "@/hooks/use-toast";
import { createTable } from "@/assets/api/Table";

// Custom hook for creating a table
const useCreateTable = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(createTable, {
    onSuccess: () => {
      queryClient.invalidateQueries("tables");
      toast({
        title: "Table created successfully",
        description:
          "The new table has been added and is now available for reservations.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to create table",
        description:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });
};

export default useCreateTable;
