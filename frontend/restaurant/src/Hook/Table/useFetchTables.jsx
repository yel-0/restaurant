import { useQuery } from "react-query";
import { fetchTables } from "@/assets/api/Table";
// Custom hook for fetching tables
const useFetchTables = () => {
  return useQuery("tables", fetchTables);
};

export default useFetchTables;
