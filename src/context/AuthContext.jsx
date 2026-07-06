import { createContext, useContext, useEffect, useState } from "react";
import storageHelper from "../utils/storageHelper";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = storageHelper.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.getProfile();
      setUser(response.data.data);
    } catch (err) {
      storageHelper.removeItem("token");
    }

    setLoading(false);
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError("");

      const response = await authAPI.login(credentials);

      const { token, user } = response.data.data;

      storageHelper.setItem("token", token);

      setUser(user);

      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";

      setError(message);

      return {
        success: false,
        error: message,
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
  // UI ko pehle update karo
  storageHelper.removeItem("token");
  setUser(null);

  // API ko background me call karo
  try {
    await authAPI.logout();
  } catch (err) {
    console.log(err);
  }
};

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        clearError: () => setError(""),
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
