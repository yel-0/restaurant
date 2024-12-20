import { useQuery } from "react-query";
import axiosInstance from "@/assets/api/axiosInstance";

const fetchOrders = async () => {
  try {
    const response = await axiosInstance.get("/order");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching orders");
  }
};

const useFetchOrders = () => {
  return useQuery("orders", fetchOrders, {
    onSuccess: (data) => {
      console.log("Fetched orders:", data);
    },
    onError: (error) => {
      console.error("Error fetching orders:", error.message);
    },
  });
};

export default useFetchOrders;
