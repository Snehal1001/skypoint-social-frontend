import axios from "axios";
import { useAuthStore } from "@/features/auth/authStore";

export const api = axios.create({
  baseURL: "https://localhost:7288",
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
