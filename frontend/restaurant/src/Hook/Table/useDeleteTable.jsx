import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

// Function to delete a table
const deleteTable = async (tableId) => {
  const response = await axios.delete(
    `http://localhost:3005/tables/delete/${tableId}`
  );
  return response.data;
};

// Custom hook for deleting a table
const useDeleteTable = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteTable, {
    onSuccess: () => {
      queryClient.invalidateQueries("tables"); // Invalidate the query to refetch tables after a successful delete
    },
  });
};

export default useDeleteTable;
