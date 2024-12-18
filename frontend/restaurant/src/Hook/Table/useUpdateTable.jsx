import { useMutation, useQueryClient } from "react-query";
import { updateTable } from "@/assets/api/Table";
// Custom hook for updating a table
const useUpdateTable = () => {
  const queryClient = useQueryClient();

  return useMutation(updateTable, {
    onSuccess: () => {
      queryClient.invalidateQueries("tables");
      alert("success");
    },
  });
};

export default useUpdateTable;
