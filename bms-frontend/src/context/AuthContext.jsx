import { createContext, useEffect, useState } from "react";
import API from "../apis";
import toast from "react-hot-toast";

// ✅ Named export
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  // 🔹 Fetch current user
  const fetchUser = async () => {
    try {
      const { data } = await API.get("/auth/me");
      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // 🔹 Login
  const login = async (formData) => {
    try {
      setAuthLoading(true);

      const { data } = await API.post("/auth/login", formData);
      setUser(data.user);

      toast.success("Welcome back!");
      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again.",
      );
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  // 🔹 Signup
  const signup = async (formData) => {
    try {
      setAuthLoading(true);

      const { data } = await API.post("/auth/signup", formData);
      setUser(data.user);

      toast.success("Account created successfully!");
      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again.",
      );
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  // 🔹 Logout
  const logout = async () => {
    try {
      await API.post("/auth/logout");
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
