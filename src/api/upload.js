import { apiAxios } from "./axios";

export const upload = async (img) => {
  const { data } = await apiAxios.post("/upload", img);
  return data;
};
