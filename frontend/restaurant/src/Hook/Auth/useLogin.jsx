import { useMutation } from "react-query";
import axios from "axios";

const loginUser = async (credentials) => {
  const response = await axios.post(
    "http://localhost:3005/user/login",
    credentials
  );
  return response.data;
};

export const useLogin = () => {
  return useMutation(loginUser, {
    onSuccess: (data) => {
      console.log("Login successful", data);
      alert("success");
    },
    onError: (error) => {
      console.error("Login failed", error);
      alert("error");
    },
  });
};
