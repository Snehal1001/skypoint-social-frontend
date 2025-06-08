import { api } from "@/lib/axios";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  email: string;
  token: string;
  currentUserId: string;
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const signup = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post("/auth/signup", data);
  return response.data;
};