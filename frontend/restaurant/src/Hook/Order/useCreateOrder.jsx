// hooks/useCreateOrder.js
import { useMutation } from "react-query";
import axiosInstance from "@/assets/api/axiosInstance";
// Create Order function to be used by React Query
const createOrder = async (orderData) => {
  try {
    const response = await axiosInstance.post("/order", orderData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating order");
  }
};

const useCreateOrder = () => {
  return useMutation(createOrder, {
    onSuccess: (data) => {
      console.log("Order created:", data);
      alert("success");
    },
    onError: (error) => {
      console.error("Error creating order:", error.message);
    },
  });
};

export default useCreateOrder;
