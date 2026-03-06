// // import { createContext, useEffect, useState } from "react";
// // import API from "../apis";
// // import toast from "react-hot-toast";

// // export const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   const fetchUser = async () => {
// //     try {
// //       const { data } = await API.get("/auth/me");
// //       setUser(data.user);
// //     } catch {
// //       setUser(null);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchUser();
// //   }, []);

// //   const login = async (formData) => {
// //     try {
// //       const { data } = await API.post("/auth/login", formData);
// //       setUser(data.user);
// //       toast.success("Welcome back!");
// //       return true;
// //     } catch (err) {
// //       return false;
// //     }
// //   };

// //   const signup = async (formData) => {
// //     try {
// //       const { data } = await API.post("/auth/signup", formData);
// //       setUser(data.user);
// //       toast.success("Account created successfully!");
// //     } catch (err) {}
// //   };

// //   const logout = async () => {
// //     await API.post("/auth/logout");
// //     setUser(null);
// //     toast.success("Logged out");
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// import { createContext, useEffect, useState } from "react";
// import API from "../apis";
// import toast from "react-hot-toast";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // for initial auth check
//   const [authLoading, setAuthLoading] = useState(false); // for login/signup

//   // 🔹 Fetch current user on app load
//   const fetchUser = async () => {
//     try {
//       const { data } = await API.get("/auth/me");
//       setUser(data.user);
//     } catch (error) {
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   // 🔹 Login
//   const login = async (formData) => {
//     try {
//       setAuthLoading(true);

//       const { data } = await API.post("/auth/login", formData);
//       setUser(data.user);

//       toast.success("Welcome back!");
//       return true;
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Login failed. Please try again.",
//       );
//       return false;
//     } finally {
//       setAuthLoading(false);
//     }
//   };

//   // 🔹 Signup
//   const signup = async (formData) => {
//     try {
//       setAuthLoading(true);

//       const { data } = await API.post("/auth/signup", formData);
//       setUser(data.user);

//       toast.success("Account created successfully!");
//       return true;
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Signup failed. Please try again.",
//       );
//       return false;
//     } finally {
//       setAuthLoading(false);
//     }
//   };

//   // 🔹 Logout
//   const logout = async () => {
//     try {
//       await API.post("/auth/logout");
//       setUser(null);
//       toast.success("Logged out successfully");
//     } catch (error) {
//       toast.error("Logout failed");
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         authLoading,
//         login,
//         signup,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;


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
