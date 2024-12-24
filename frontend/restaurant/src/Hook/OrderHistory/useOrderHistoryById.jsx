import { useQuery } from "react-query";
import axiosInstance from "@/assets/api/axiosInstance";
// Fetch order history by _id
const fetchOrderHistoryById = async (id) => {
  try {
    const response = await axiosInstance.get(`/order-history/getById/${id}`); // Make GET request using axiosInstance
    return response.data; // Return the data (order history)
  } catch (error) {
    throw new Error("Error fetching order history");
  }
};

// Custom hook to use order history by id
const useOrderHistoryById = (id) => {
  return useQuery(
    ["orderHistoryById", id], // Unique query key for caching
    () => fetchOrderHistoryById(id), // The fetch function
    {
      enabled: !!id, // Only fetch if id is available
      retry: false, // Disable automatic retries on failure
      refetchOnWindowFocus: false, // Prevent refetching when window is focused
    }
  );
};

export default useOrderHistoryById;
