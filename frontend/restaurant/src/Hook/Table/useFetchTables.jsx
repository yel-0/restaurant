import { useQuery } from "react-query";
import { fetchTables } from "@/assets/api/Table";

// Custom hook for fetching tables with pagination
const useFetchTables = (page = 1, limit = 10) => {
  return useQuery(["tables", page], () => fetchTables(page, limit), {
    keepPreviousData: true, // This allows smooth pagination experience
  });
};

export default useFetchTables;
