import { useMutation, useQueryClient } from "react-query";
import { deleteCategory } from "@/assets/api/category";

const useDeleteCategory = (option) => {
  return useMutation(deleteCategory, option);
};

export default useDeleteCategory;
