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
