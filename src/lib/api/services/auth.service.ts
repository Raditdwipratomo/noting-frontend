import apiClient from "../client";
import type { ApiResponse, UserResponse, UserUpdateInput } from "@/lib/types";
import {
  RegisterRequest,
  RefreshTokenResponse,
  AuthResponse,
} from "@/lib/types/auth.types";
import { apiRoutes } from "@/lib/types/constants";
import axios from "axios";

class AuthServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown,
  ) {
    super(message);
    this.name = "AuthServiceError";
  }
}

function handleServiceError(error: unknown, context: string): never {
  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;
    const serverMessage = error.response?.data?.message;

    if (statusCode === 400) {
      throw new AuthServiceError(
        `Permintaan tidak valid: ${serverMessage ?? context}`,
        statusCode,
        error,
      );
    }
    if (statusCode === 401) {
      throw new AuthServiceError(
        `Email atau password salah`,
        statusCode,
        error,
      );
    }
    if (statusCode === 403) {
      throw new AuthServiceError(
        `Akses ditolak: ${context}`,
        statusCode,
        error,
      );
    }
    if (statusCode === 404) {
      throw new AuthServiceError(
        `Data tidak ditemukan: ${context}`,
        statusCode,
        error,
      );
    }
    if (statusCode === 409) {
      throw new AuthServiceError(`Email sudah terdaftar`, statusCode, error);
    }
    if (statusCode === 422) {
      throw new AuthServiceError(
        `Data tidak valid: ${serverMessage ?? context}`,
        statusCode,
        error,
      );
    }
    if (statusCode && statusCode >= 500) {
      throw new AuthServiceError(`Server error: ${context}`, statusCode, error);
    }

    throw new AuthServiceError(
      serverMessage ?? `Terjadi kesalahan: ${context}`,
      statusCode,
      error,
    );
  }

  throw new AuthServiceError(
    `Unexpected error on: ${context}`,
    undefined,
    error,
  );
}

class AuthService {
  private readonly basePath = `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/api/auth`;

  async register(data: RegisterRequest): Promise<AuthResponse> {
    if (!data || Object.keys(data).length === 0) {
      throw new AuthServiceError("Data registrasi tidak boleh kosong");
    }
    if (!data.email || !data.password) {
      throw new AuthServiceError("Email dan password wajib diisi");
    }

    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        apiRoutes.API.AUTH.REGISTER,
        data,
      );

      if (!response.data?.data) {
        throw new AuthServiceError("Registrasi gagal, coba lagi");
      }

      if (response.data.data.accessToken) {
        this.setAccessToken(response.data.data.accessToken);
        this.setUser(response.data.data.user);
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof AuthServiceError) throw error;
      handleServiceError(error, "register()");
    }
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    if (!email || email.trim() === "") {
      throw new AuthServiceError("Email tidak boleh kosong");
    }
    if (!password || password.trim() === "") {
      throw new AuthServiceError("Password tidak boleh kosong");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new AuthServiceError("Format email tidak valid");
    }

    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        apiRoutes.API.AUTH.LOGIN,
        { email, password },
      );

      if (!response.data?.data) {
        throw new AuthServiceError("Login gagal, coba lagi");
      }

      if (response.data.data.accessToken) {
        this.setAccessToken(response.data.data.accessToken);
        this.setUser(response.data.data.user);
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof AuthServiceError) throw error;
      handleServiceError(error, "login()");
    }
  }

  async refreshToken(): Promise<RefreshTokenResponse> {
    try {
      const response = await apiClient.post<ApiResponse<RefreshTokenResponse>>(
        apiRoutes.API.AUTH.REFRESH,
        {},
        { withCredentials: true },
      );

      if (!response.data?.data?.accessToken) {
        throw new AuthServiceError(
          "Gagal memperbarui token, silakan login ulang",
        );
      }

      this.setAccessToken(response.data.data.accessToken);

      return response.data.data;
    } catch (error) {
      if (error instanceof AuthServiceError) throw error;
      handleServiceError(error, "refreshToken()");
    }
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post(
        apiRoutes.API.AUTH.LOGOUT,
        {},
        { withCredentials: true },
      );
    } catch (error) {
      // Intentionally swallowed — logout should always clear local state
      // even when the server request fails (e.g. expired token, network issue)
      console.warn("Logout request failed, clearing local auth anyway:", error);
    } finally {
      this.clearAuth();
    }
  }

  async updateProfile(data: Partial<UserUpdateInput>): Promise<UserResponse> {
    if (!data || Object.keys(data).length === 0) {
      throw new AuthServiceError("Data update tidak boleh kosong");
    }

    try {
      const response = await apiClient.put<ApiResponse<{ user: UserResponse }>>(
        apiRoutes.API.AUTH.PROFILE,
        data,
      );

      if (!response.data?.data?.user) {
        throw new AuthServiceError("Gagal memperbarui profil");
      }

      this.setUser(response.data.data.user);

      return response.data.data.user;
    } catch (error) {
      if (error instanceof AuthServiceError) throw error;
      handleServiceError(error, "updateProfile()");
    }
  }

  async changePassword(
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    if (!oldPassword || oldPassword.trim() === "") {
      throw new AuthServiceError("Password lama tidak boleh kosong");
    }
    if (!newPassword || newPassword.trim() === "") {
      throw new AuthServiceError("Password baru tidak boleh kosong");
    }
    if (oldPassword === newPassword) {
      throw new AuthServiceError(
        "Password baru tidak boleh sama dengan password lama",
      );
    }
    if (newPassword.length < 8) {
      throw new AuthServiceError("Password baru minimal 8 karakter");
    }

    try {
      await apiClient.post<ApiResponse<void>>(
        apiRoutes.API.AUTH.CHANGE_PASSWORD,
        { oldPassword, newPassword },
      );
    } catch (error) {
      if (error instanceof AuthServiceError) throw error;
      handleServiceError(error, "changePassword()");
    }
  }

  async getProfile(): Promise<UserResponse> {
    try {
      const response = await apiClient.get<ApiResponse<{ user: UserResponse }>>(
        apiRoutes.API.AUTH.PROFILE,
      );

      if (!response.data?.data?.user) {
        throw new AuthServiceError("Data profil tidak ditemukan");
      }

      return response.data.data.user;
    } catch (error) {
      if (error instanceof AuthServiceError) throw error;
      handleServiceError(error, "getProfile()");
    }
  }

  getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("accessToken");
  }

  setAccessToken(token: string): void {
    if (typeof window === "undefined") return;
    if (!token || token.trim() === "") {
      throw new AuthServiceError("Token tidak valid");
    }
    localStorage.setItem("accessToken", token);
  }

  getStoredUser(): UserResponse | null {
    if (typeof window === "undefined") return null;

    try {
      const userJson = localStorage.getItem("user");
      if (!userJson) return null;
      return JSON.parse(userJson) as UserResponse;
    } catch {
      // Corrupted JSON in localStorage — clear it and return null
      console.warn("Stored user data is corrupted, clearing...");
      localStorage.removeItem("user");
      return null;
    }
  }

  setUser(user: UserResponse): void {
    if (typeof window === "undefined") return;
    if (!user) {
      throw new AuthServiceError("Data user tidak valid");
    }
    localStorage.setItem("user", JSON.stringify(user));
  }

  clearAuth(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}

export const authService = new AuthService();
