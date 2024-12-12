import { useMutation } from "react-query";
import { createMenuItem } from "@/assets/api/Menu";

const useCreateMenu = () => {
  const mutation = useMutation(createMenuItem, {
    onSuccess: (data) => {
      console.log("Menu item created successfully:", data);
      alert("Menu item created successfully!");
    },
    onError: (error) => {
      console.error("Error creating menu item:", error);
      alert(
        `Error creating menu item: ${error.message || "Something went wrong"}`
      );
    },
  });

  return mutation;
};

export default useCreateMenu;
