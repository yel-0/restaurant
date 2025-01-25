import { useMutation } from "react-query";
import { createMenuItem } from "@/assets/api/Menu";
import { useToast } from "@/hooks/use-toast";

const useCreateMenu = () => {
  const { toast } = useToast();
  const mutation = useMutation(createMenuItem, {
    onSuccess: (data) => {
      toast({
        title: "Menu item created successfully",
        description: `The menu item "${data.name}" has been successfully added to the menu.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to create menu item",
        description:
          error.message ||
          "There was an error while creating the menu item. Please try again.",
      });
    },
  });

  return mutation;
};

export default useCreateMenu;
