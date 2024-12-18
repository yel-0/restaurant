import { useQuery } from "react-query";
import { fetchCategories } from "@/assets/api/category";

const useFetchCategories = () => {
  return useQuery(["categories"], fetchCategories);
};

export default useFetchCategories;
