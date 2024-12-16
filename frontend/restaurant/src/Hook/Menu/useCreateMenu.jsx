import { useMutation } from "react-query";
import { createMenuItem } from "@/assets/api/Menu";
import { useToast } from "@/hooks/use-toast";

const useCreateMenu = () => {
  const { toast } = useToast();
  const mutation = useMutation(createMenuItem, {
    onSuccess: (data) => {
      toast({
        title: "Menu item is create successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Creating menu item is fail",
      });
    },
  });

  return mutation;
};

export default useCreateMenu;
