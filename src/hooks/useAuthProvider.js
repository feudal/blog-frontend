import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import api from "../api";
import { ACCESS_TOKEN_KEY } from "../app-constants";

export const clearLocalStorage = () =>
  localStorage.removeItem(ACCESS_TOKEN_KEY);

export function useAuthProvider(apiCalls) {
  const [user, setUser] = useState(null);
  const queryClient = useQueryClient();

  const { isLoading, error } = useQuery("profile", apiCalls.getUser, {
    retry: false,
    onSuccess: (user) => setUser(user),
    onError: () => setUser(null),
    enabled: !!localStorage.getItem(ACCESS_TOKEN_KEY),
  });

  const login = async (credentials) => {
    const user = await api.authApi.login(credentials);
    setUser(user);
  };

  const register = async (credentials) => {
    const user = await api.authApi.register(credentials);
    setUser(user);
  };

  const logout = async () => {
    try {
      await apiCalls.logout();
    } finally {
      setUser(null);
      queryClient.clear();
      clearLocalStorage();
    }
  };

  return {
    user,
    isLoading,
    login,
    register,
    logout,
    error,
  };
}
