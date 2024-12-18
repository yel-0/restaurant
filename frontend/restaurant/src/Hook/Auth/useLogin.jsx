import { useMutation } from "react-query";
import { loginUser } from "@/assets/api/user";

export const useLogin = () => {
  return useMutation(loginUser, {
    onSuccess: (data) => {
      if (data?.token) {
        localStorage.setItem("token", data.token);
        alert("Login successful");
      }
    },
    onError: (error) => {
      console.error("Login failed", error);
      alert("error");
    },
  });
};
