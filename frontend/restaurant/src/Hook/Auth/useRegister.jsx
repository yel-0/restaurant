import { useMutation } from "react-query";
import { registerUser } from "@/assets/api/user";
import { useToast } from "@/hooks/use-toast";

export const useRegister = () => {
  const { toast } = useToast();

  return useMutation(registerUser, {
    onSuccess: (data) => {
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Registration Failed",
        description:
          error?.response?.data?.message ||
          "An error occurred during registration.",
        variant: "destructive",
      });
    },
  });
};
