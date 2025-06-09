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
export type LogOutResponse = {
  sessionDuration: string;
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post("/Auth/login", data);
  return response.data;
};

export const signup = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post("/Auth/signup", data);
  return response.data;
};

export const logout = async (): Promise<LogOutResponse> => {
  const response = await api.post("Auth/logout");
  return response.data;
};
