import { useQuery } from "react-query";
import axiosInstance from "@/assets/api/axiosInstance";

// Custom hook to fetch order history by orderId
const useOrderHistory = (orderId, shouldFetch) => {
  // Define the query key based on the orderId
  const queryKey = ["orderHistory", orderId];

  const fetchOrderHistory = async () => {
    const response = await axiosInstance.get(`/order-history/${orderId}`);
    return response.data;
  };

  const { data, error, isLoading, isError } = useQuery(
    queryKey,
    fetchOrderHistory,
    {
      enabled: shouldFetch && !!orderId, // Fetch only if both conditions are met
    }
  );

  return { data, error, isLoading, isError };
};

export default useOrderHistory;
