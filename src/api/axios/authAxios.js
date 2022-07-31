import axios from "axios";

export const authAxios = axios.create();
authAxios.defaults.baseURL = "http://localhost:4444";
