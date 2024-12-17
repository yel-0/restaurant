import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

// Function to update a table
const updateTable = async ({ tableId, updatedData }) => {
  const response = await axios.put(
    `http://localhost:3005/tables/${tableId}`,
    updatedData
  );
  return response.data;
};

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
