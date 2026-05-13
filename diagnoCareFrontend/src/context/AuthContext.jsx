import { useCallback, useMemo, useState } from "react";
import { AuthContext } from "./auth";

const getStoredAuth = () => ({
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role"),
  userId: localStorage.getItem("userId"),
});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(getStoredAuth);

  const login = useCallback(({ token, role, userId }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    if (userId) {
      localStorage.setItem("userId", userId);
    }
    setAuth({ token, role, userId });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    setAuth({ token: null, role: null, userId: null });
  }, []);

  const value = useMemo(
    () => ({
      ...auth,
      isAuthenticated: Boolean(auth.token),
      login,
      logout,
    }),
    [auth, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
