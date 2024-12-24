import { useMutation } from "react-query";
import axiosInstance from "@/assets/api/axiosInstance";
const updateOrder = async ({ id, data }) => {
  const response = await axiosInstance.put(`/order/${id}`, data);
  return response.data;
};

export const useUpdateOrder = () => {
  return useMutation(updateOrder, {
    onSuccess: (data) => {
      alert("success");
    },
    onError: (error) => {
      alert("error");
    },
  });
};
