import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
const deleteCategory = async (id) => {
  const response = await axios.delete(
    `http://localhost:3005/category/delete/${id}`
  );
  return response.data;
};

const useDeleteCategory = (option) => {
  return useMutation(deleteCategory, option);
};

export default useDeleteCategory;
