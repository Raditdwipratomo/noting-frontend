// src/lib/api/client.ts
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

// ============================================
// API CLIENT CONFIGURATION
// ============================================

const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important: untuk mengirim httpOnly cookies
};

// Create axios instance
export const apiClient: AxiosInstance = axios.create(API_CONFIG);

// Track if we're currently refreshing token
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

// Process queued requests after token refresh
const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// ============================================
// REQUEST INTERCEPTOR
// ============================================

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add access token to headers if available
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // Log request in development
    if (process.env.NODE_ENV === "development") {
      console.log("🚀 API Request:", {
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

// ============================================
// RESPONSE INTERCEPTOR
// ============================================

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (process.env.NODE_ENV === "development") {
      console.log("✅ API Response:", {
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

    // Log error in development
    if (process.env.NODE_ENV === "development") {
      console.log("Error", error);
      console.error("❌ API Error:", {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      });
    }

    // Handle 401 Unauthorized - Token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Try to refresh token
        const response = await axios.post(
          `${API_CONFIG.baseURL}/api/auth/refresh-token`,
          {},
          {
            withCredentials: true, // Send httpOnly cookie
          },
        );

        const { accessToken } = response.data.data;

        // Save new token
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", accessToken);
        }

        // Update authorization header
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        // Process queued requests
        processQueue(null, accessToken);

        // Retry original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed - logout user
        processQueue(refreshError as Error, null);

        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");

          // Redirect to login page
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      // User doesn't have permission
      return Promise.reject({
        message: "Anda tidak memiliki akses untuk melakukan tindakan ini",
        code: "FORBIDDEN",
      });
    }

    // Handle 404 Not Found
    if (error.response?.status === 404) {
      return Promise.reject({
        message: "Data tidak ditemukan",
        code: "NOT_FOUND",
      });
    }

    // Handle 422 Validation Error
    if (error.response?.status === 422) {
      return Promise.reject({
        message: "Data yang dimasukkan tidak valid",
        code: "VALIDATION_ERROR",
        errors: error.response.data,
      });
    }

    // Handle 500 Server Error
    if (error.response?.status === 500) {
      return Promise.reject({
        message: "Terjadi kesalahan pada server. Silakan coba lagi nanti.",
        code: "SERVER_ERROR",
      });
    }

    // Handle Network Error
    if (error.message === "Network Error") {
      return Promise.reject({
        message: "Koneksi bermasalah. Periksa koneksi internet Anda.",
        code: "NETWORK_ERROR",
      });
    }

    // Default error handling
    return Promise.reject(error);
  },
);

export default apiClient;
