import { useQuery } from "react-query";
import { fetchTables } from "@/assets/api/Table";

// Custom hook for fetching tables with pagination and search
const useFetchTables = (page = 1, limit = 10, search = "") => {
  return useQuery(
    ["tables", page, search],
    () => fetchTables(page, limit, search),
    {
      keepPreviousData: true, // Keeps previous data for smoother transitions
    }
  );
};

export default useFetchTables;
