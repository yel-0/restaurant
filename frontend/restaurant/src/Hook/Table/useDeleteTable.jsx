import { useMutation, useQueryClient } from "react-query";
import { deleteTable } from "@/assets/api/Table";

// Custom hook for deleting a table
const useDeleteTable = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteTable, {
    onSuccess: () => {
      queryClient.invalidateQueries("tables");
    },
  });
};

export default useDeleteTable;
