import { apiAxios } from "./axios";
import { ACCESS_TOKEN_KEY } from "../app-constants";

export const authApi = {
  register: async (credential) => {
    const { data } = await apiAxios.post("/auth/register", credential);
    return data;
  },
  login: async (credential) => {
    const { data } = await apiAxios.post("/auth/login", credential);

    localStorage.setItem(ACCESS_TOKEN_KEY, data.token);
    return data;
  },
  getUser: async () => {
    const { data } = await apiAxios.get("/auth/me");
    return data;
  },
};
