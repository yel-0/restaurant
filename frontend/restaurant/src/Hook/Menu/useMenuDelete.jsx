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
        title: "Menu item is delete successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Menu item is delete fail",
      });
    },
  });
};
