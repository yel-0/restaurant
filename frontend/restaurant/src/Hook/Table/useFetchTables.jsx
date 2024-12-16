import { useQuery } from "react-query";
import axios from "axios";

// Function to fetch all tables
const fetchTables = async () => {
  const response = await axios.get("http://localhost:3005/tables");
  return response.data;
};

// Custom hook for fetching tables
const useFetchTables = () => {
  return useQuery("tables", fetchTables);
};

export default useFetchTables;
