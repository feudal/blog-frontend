import { apiAxios } from "./axios";

export const posts = {
  get: async () => {
    const { data } = await apiAxios.get("/posts");
    return data;
  },
  getById: async (id) => {
    const { data } = await apiAxios.get(`/posts/${id}`);
    return data;
  },
  create: async (body) => {
    const { data } = await apiAxios.post("/posts", body);
    return data;
  },
  update: async (id, body) => {
    const { data } = await apiAxios.patch(`/posts/${id}`, body);
    return data;
  },
  delete: async (id) => {
    return await apiAxios.delete(`/posts/${id}`);
  },
  getTags: async () => {
    const { data } = await apiAxios.get("/posts/tags");
    return data;
  },
};
