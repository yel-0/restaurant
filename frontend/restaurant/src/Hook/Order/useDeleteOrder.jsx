import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "@/assets/api/axiosInstance";
import { useToast } from "@/hooks/use-toast";

// Function to delete an order by ID
const deleteOrder = async (orderId) => {
  const response = await axiosInstance.delete(`/order/${orderId}`);
  return response.data; // Assuming the API returns the order data after deletion
};

// Custom hook for deleting an order
const useDeleteOrder = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient(); // Get the query client

  return useMutation(deleteOrder, {
    onSuccess: () => {
      // Invalidate the 'orders' query to refetch it and update the list of orders
      queryClient.invalidateQueries("orders");

      // Trigger a success toast notification with title and description
      toast({
        title: "Order Deleted",
        description: "The order has been successfully deleted.",
        variant: "success", // You can define variants for different types (success, error, etc.)
      });
    },
    onError: (error) => {
      // Trigger an error toast notification with title and description
      toast({
        title: "Error Deleting Order",
        description:
          error.response?.data?.message || "An unexpected error occurred.",
        variant: "destructive", // You can customize the variant as per your design
      });
    },
  });
};

export default useDeleteOrder;
