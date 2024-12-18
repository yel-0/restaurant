import { useMutation, useQueryClient } from "react-query";
import { useToast } from "@/hooks/use-toast";
import { createCategory } from "@/assets/api/category";

const useCreateCategory = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(createCategory, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["categories"]);
      toast({
        title: "Category created successfully",
        description: "The category was created and added to the list.",
      });
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "Creation failed",
        description:
          "There was an error creating the category. Please try again.",
      });
    },
  });
};

export default useCreateCategory;
