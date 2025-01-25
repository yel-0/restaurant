import { useMutation, useQueryClient } from "react-query";
import { deleteMenuItem } from "@/assets/api/Menu";
import { useToast } from "@/hooks/use-toast";

export const useMenuDelete = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(deleteMenuItem, {
    onSuccess: () => {
      queryClient.invalidateQueries("menuItems");
      toast({
        title: "Menu item deleted successfully",
        description:
          "The selected menu item has been successfully deleted from the menu.",
        variant: "success", // Optional: can set different variants like success, error, etc.
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to delete menu item",
        description:
          error.response?.data?.message || "An unexpected error occurred.",
        variant: "destructive", // Optional: can customize error variant as per design
      });
    },
  });
};
