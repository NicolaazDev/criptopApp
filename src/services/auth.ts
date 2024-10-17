import api from "./api";

import { saveToken, removeToken } from "@/utils/storage";

interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  id: string;
  username: string;
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post("/store/customers/login", {
    email,
    password,
  });
  const { token } = response.data.customer;

  saveToken(token);

  return { token };
};

export const register = async (
  email: string,
  password: string
): Promise<RegisterResponse> => {
  const response = await api.post("/users/createUser", {
    email,
    password,
  });
  const { id, username } = response.data;

  return { id, username };
};

export const logout = () => {
  removeToken();
};
