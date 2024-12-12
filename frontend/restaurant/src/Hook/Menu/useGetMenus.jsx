import { useQuery } from "react-query";
import { getMenuItems } from "@/assets/api/Menu";
// React Query hook to fetch menu items
export const useGetMenus = ({ category, name, limit = 10, page = 1 }) => {
  return useQuery(
    ["menuItems", category, name, limit, page],
    () => getMenuItems({ category, name, limit, page }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
};
