import { useQuery } from "react-query";
import axiosInstance from "@/assets/api/axiosInstance";
const fetchAuthUser = async () => {
  const response = await axiosInstance.get("/user/auth/info");
  return response.data;
};

export const useAuthUser = () => {
  return useQuery(["authUser"], fetchAuthUser, {
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: false, // Disable retries if the token is invalid
  });
};
