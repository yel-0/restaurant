import { useQuery } from "react-query";
import axiosInstance from "@/assets/api/axiosInstance";

const fetchOrderById = async (id) => {
  try {
    const response = await axiosInstance.get(`/order/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error fetching order by ID"
    );
  }
};

const useFetchOrderById = (id) => {
  return useQuery(["order", id], () => fetchOrderById(id), {
    enabled: !!id, // Ensures the query runs only when `id` is truthy
    onSuccess: (data) => {
      console.log("Fetched order by ID:", data);
    },
    onError: (error) => {
      console.error("Error fetching order by ID:", error.message);
    },
  });
};

export default useFetchOrderById;
