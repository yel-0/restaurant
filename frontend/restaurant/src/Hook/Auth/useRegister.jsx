import { useMutation } from "react-query";
import { registerUser } from "@/assets/api/user";

export const useRegister = () => {
  return useMutation(registerUser, {
    onSuccess: (data) => {
      console.log("Registration successful", data);
      alert("success");
    },
    onError: (error) => {
      console.error("Registration failed", error);
      alert("error");
    },
  });
};
