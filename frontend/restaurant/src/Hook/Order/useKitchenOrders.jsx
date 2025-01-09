import { useQuery } from "react-query";
import axiosInstance from "@/assets/api/axiosInstance";
// Fetch kitchen orders using axiosInstance
const fetchKitchenOrders = async ({ queryKey }) => {
  const [, startDate] = queryKey; // Extract startDate from queryKey
  const response = await axiosInstance.get(
    `/order/kitchen/orders${startDate ? `?startDate=${startDate}` : ""}`
  );
  return response.data;
};

// Custom hook
export const useKitchenOrders = (startDate) => {
  return useQuery(["kitchenOrders", startDate], fetchKitchenOrders, {
    enabled: !!startDate, // Only fetch if startDate is provided
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });
};
