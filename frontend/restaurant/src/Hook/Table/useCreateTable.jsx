import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

// Function to create a new table
const createTable = async (tableData) => {
  const response = await axios.post(
    "http://localhost:3005/tables/create",
    tableData
  );
  return response.data;
};

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
