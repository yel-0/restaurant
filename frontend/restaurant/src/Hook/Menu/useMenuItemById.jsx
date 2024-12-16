import { useQuery } from "react-query";
import { getMenuItemById } from "@/assets/api/Menu";
export const useMenuItemById = (id) => {
  return useQuery(["menuItem", id], () => getMenuItemById(id), {
    enabled: !!id,
  });
};
