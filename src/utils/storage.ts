const TOKEN_KEY = "auth_token";
import Cookies from "js-cookie";

export const saveToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, { expires: 7 });
};

export const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};
