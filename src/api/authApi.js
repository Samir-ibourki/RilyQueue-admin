import api from "./axios";
export const requestOtp = (data) => api.post("/auth/otp/request", data);
export const verifyOtp = (phone, otp) =>
  api.post("/auth/otp/verify", { phone, otp });
