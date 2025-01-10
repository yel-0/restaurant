import { useMutation } from "react-query";
import axiosInstance from "@/assets/api/axiosInstance";

const updateOrderAndItems = async ({ orderId, data }) => {
  console.log(data);

  const response = await axiosInstance.put(
    `/order/orders/${orderId}/status`,
    data
  );
  return response.data;
};

const useUpdateOrderAndItems = (onSuccess, onError) => {
  const mutation = useMutation(updateOrderAndItems, {
    onSuccess,
    onError,
  });

  return mutation;
};

export default useUpdateOrderAndItems;
