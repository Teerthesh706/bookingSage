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
    if (status !== 401) {
      toast.error(data?.message || "Something went wrong");
    }

    return Promise.reject(error);
  },
);

export default API;
