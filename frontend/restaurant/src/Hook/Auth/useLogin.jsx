import { useMutation } from "react-query";
import { loginUser } from "@/assets/api/user";
import { useToast } from "@/hooks/use-toast";

export const useLogin = () => {
  const { toast } = useToast();
  return useMutation(loginUser, {
    onSuccess: (data) => {
      if (data?.token) {
        localStorage.setItem("token", data.token);
        toast({
          title: "Login successful",
          description: "You have successfully logged in.",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Login failed",
        description: "There was an issue with your login credentials.",
        variant: "destructive",
      });
    },
  });
};
