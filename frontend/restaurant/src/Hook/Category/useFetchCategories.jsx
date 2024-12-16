import { useQuery } from "react-query";
import axios from "axios";
const fetchCategories = async () => {
  const response = await axios.get("http://localhost:3005/category/categories");
  return response.data;
};

const useFetchCategories = () => {
  return useQuery(["categories"], fetchCategories);
};

export default useFetchCategories;
