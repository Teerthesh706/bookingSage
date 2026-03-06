// import axios from "axios";
// import toast from "react-hot-toast";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
//   withCredentials: true,
// });

// // Response interceptor
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       const message = error.response.data.message || "Something went wrong";
//       toast.error(message);

//       if (error.response.status === 401) {
//         window.location.href = "/login";
//       }
//     } else {
//       toast.error("Server not reachable");
//     }

//     return Promise.reject(error);
//   },
// );

// export default API;

import axios from "axios";
import toast from "react-hot-toast";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

// 🔹 Response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      toast.error("Server not reachable");
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    // ❌ DO NOT redirect using window.location.href
    // Let AuthContext or React Router handle navigation

    if (status !== 401) {
      toast.error(data?.message || "Something went wrong");
    }

    return Promise.reject(error);
  },
);

export default API;
