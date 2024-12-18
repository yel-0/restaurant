import { useMutation, useQueryClient } from "react-query";
import { updateCategory } from "@/assets/api/category";
const useUpdateCategory = (option) => {
  return useMutation(updateCategory, option);
};

export default useUpdateCategory;
