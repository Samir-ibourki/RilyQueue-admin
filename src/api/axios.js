import axios from "axios";
const api_url = "http://localhost:3003/v1";

const api = axios.create({
  baseURL: api_url,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  try {
    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      const { state } = JSON.parse(authStorage);
      if (state?.token) {
        config.headers.Authorization = `Bearer ${state.token}`;
      }
    }
  } catch (error) {
    console.error("Error reading auth token:", error);
  }
  return config;
});
export default api;
