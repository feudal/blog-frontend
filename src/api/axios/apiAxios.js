import axios from "axios";
import { ACCESS_TOKEN_KEY } from "../../app-constants";

export const apiAxios = axios.create();
apiAxios.defaults.baseURL = "http://localhost:4444";

export const authInterceptor = (config) => {
  const authToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (!config.headers) config.headers = {};
  if (authToken) config.headers["Authorization"] = `Bearer ${authToken}`;

  return config;
};

apiAxios.interceptors.request.use(authInterceptor);
