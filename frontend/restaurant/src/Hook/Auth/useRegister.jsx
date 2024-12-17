import { useMutation } from "react-query";
import axios from "axios";

const registerUser = async (userData) => {
  const response = await axios.post(
    "http://localhost:3005/user/register",
    userData
  );
  return response.data;
};

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
