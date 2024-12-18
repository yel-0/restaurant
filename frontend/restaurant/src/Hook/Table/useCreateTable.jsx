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
        title: "Table  create successfully",
      });
    },
  });
};

export default useCreateTable;
