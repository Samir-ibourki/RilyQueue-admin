import { requestOtp, verifyOtp } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/useStore";

export const useRequestOtp = () => {
  return useMutation({
    mutationFn: requestOtp,
  });
};

export const useVerifyOtp = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: ({ phone, otp }) => verifyOtp(phone, otp),
    onSuccess: (res) => {
      const { user, token } = res.data;
      if (user.role === "admin") {
        login(user, token);
        navigate("/");
      } else {
       
        alert("acces refuse : Vous n'avez pas les permissions necessaires.");
      }
    },
  });
};
