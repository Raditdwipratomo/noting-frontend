// src/lib/api/client.ts
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

// Konfigurasi base URL
const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_GATEWAY_URL || "http://localhost:4000",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
};

// Buat axios instance
export const apiClient: AxiosInstance = axios.create(API_CONFIG);

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Tambahkan token jika ada
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // Log request di development
    if (process.env.NODE_ENV === "development") {
      console.log("🚀 Request:", {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
      });
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Log response di development
    if (process.env.NODE_ENV === "development") {
      console.log("✅ Response:", {
        status: response.status,
        data: response.data,
      });
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Log error di development
    if (process.env.NODE_ENV === "development") {
      console.error("❌ Error:", {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      });
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try refresh token
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await axios.post(
            `${API_CONFIG.baseURL}/api/auth/refresh`,
            { refreshToken },
          );

          const { token } = response.data.data;
          localStorage.setItem("token", token);

          // Retry original request
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, logout user
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      }
    }

    // Handle 503 Service Unavailable
    if (error.response?.status === 503) {
      return Promise.reject({
        message: "Service temporarily unavailable. Please try again later.",
        code: "SERVICE_UNAVAILABLE",
      });
    }

    return Promise.reject(error);
  },
);

export default apiClient;
