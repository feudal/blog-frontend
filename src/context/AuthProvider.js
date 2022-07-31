import React from "react";

import { useAuthProvider } from "../hooks";

export const AuthContext = React.createContext({
  user: null,
  userEmail: undefined,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  confirmLogin: async () => {},
  confirmResetPassword: async () => {},
  resendCode: async () => {},
  error: null,
  organization: null,
  roles: undefined,
});

export const AuthProvider = ({ children, ...apiCalls }) => {
  const value = useAuthProvider(apiCalls);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
