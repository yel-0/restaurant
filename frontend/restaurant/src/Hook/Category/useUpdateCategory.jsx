import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
const updateCategory = async ({ id, name }) => {
  const response = await axios.put(
    `http://localhost:3005/category/update/${id}`,
    { name }
  );
  return response.data;
};

const useUpdateCategory = (option) => {
  return useMutation(updateCategory, option);
};

export default useUpdateCategory;
