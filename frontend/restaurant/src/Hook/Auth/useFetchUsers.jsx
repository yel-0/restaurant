import { useQuery } from "react-query";
import { fetchUsers } from "@/assets/api/user";

// Custom hook for fetching users
const useFetchUsers = ({ name, role, status, page = 1, limit = 10 }) => {
  return useQuery(["users", { name, role, status, page, limit }], fetchUsers, {
    keepPreviousData: true,
  });
};

export default useFetchUsers;
