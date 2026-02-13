import apiClient from "../client";
import type { ApiResponse, UserResponse, UserUpdateInput } from "@/lib/types";
import {
  RegisterRequest,
  RefreshTokenResponse,
  AuthResponse,
} from "@/lib/types/auth.types";

class AuthService {
  private readonly basePath = "/api/auth";

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      `${this.basePath}/register`,
      data,
    );

    if (response.data.data?.accessToken) {
      this.setAccessToken(response.data.data.accessToken);
      this.setUser(response.data.data.user);
    }

    return response.data.data as AuthResponse;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      `${this.basePath}/login`,
      { email, password },
    );

    if (response.data.data?.accessToken) {
      this.setAccessToken(response.data.data.accessToken);
      this.setUser(response.data.data.user);
    }

    return response.data.data as AuthResponse;
  }

  async refreshToken(): Promise<RefreshTokenResponse> {
    const response = await apiClient.post<ApiResponse<RefreshTokenResponse>>(
      `${this.basePath}/refresh-token`,
      {},
      {
        withCredentials: true, // Important: send cookies
      },
    );

    // Update access token
    if (response.data.data?.accessToken) {
      this.setAccessToken(response.data.data.accessToken);
    }

    return response.data.data!;
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post(
        `${this.basePath}/logout`,
        {},
        {
          withCredentials: true, // Important: send cookies to clear
        },
      );
    } finally {
      // Always clear local storage even if request fails
      this.clearAuth();
    }
  }

  async updateProfile(data: Partial<UserUpdateInput>): Promise<UserResponse> {
    const response = await apiClient.put<ApiResponse<{ user: UserResponse }>>(
      `${this.basePath}/profile`,
      data,
    );

    // Update stored user
    if (response.data.data?.user) {
      this.setUser(response.data.data.user);
    }

    return response.data.data!.user;
  }

  /**
   * Change password
   */
  async changePassword(
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    await apiClient.post<ApiResponse<void>>(
      `${this.basePath}/change-password`,
      {
        oldPassword,
        newPassword,
      },
    );
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<UserResponse> {
    const response = await apiClient.get<ApiResponse<{ user: UserResponse }>>(
      `${this.basePath}/profile`,
    );
    return response.data.data!.user;
  }

  getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("accessToken");
  }

  setAccessToken(token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem("accessToken", token);
  }

  getStoredUser(): UserResponse | null {
    if (typeof window === "undefined") return null;
    const userJson = localStorage.getItem("user");
    return userJson ? JSON.parse(userJson) : null;
  }

  setUser(user: UserResponse): void {
    if (typeof window === "undefined") return;
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
