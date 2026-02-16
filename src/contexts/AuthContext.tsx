// src/contexts/AuthContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/api/services/auth.service";
import type { UserResponse, UserUpdateInput } from "@/lib/types";
import type { RegisterRequest } from "@/lib/types/auth.types";

// ============================================
// CONTEXT TYPES
// ============================================

interface AuthContextType {
  user: UserResponse | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<UserUpdateInput>) => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================
// AUTH PROVIDER COMPONENT
// ============================================

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ============================================
  // INITIALIZE AUTH STATE
  // ============================================

  const initializeAuth = useCallback(async () => {
    try {
      setLoading(true);

      // Check if token exists
      const token = authService.getAccessToken();
      if (!token) {
        setUser(null);
        return;
      }

      // Try to get user profile
      const userData = await authService.getProfile();
      setUser(userData);
    } catch (error) {
      console.error("Auth initialization error:", error);
      // Clear invalid token
      authService.clearAuth();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // ============================================
  // LOGIN
  // ============================================

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      router.push("/dashboard");
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Login gagal. Silakan coba lagi.",
      );
    }
  };

  // ============================================
  // REGISTER
  // ============================================

  const register = async (data: RegisterRequest) => {
    try {
      const response = await authService.register(data);
      setUser(response.user);
      router.push("/dashboard");
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Registrasi gagal. Silakan coba lagi.",
      );
    }
  };

  // ============================================
  // LOGOUT
  // ============================================

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      router.push("/login");
    }
  };

  // ============================================
  // UPDATE USER
  // ============================================

  const updateUser = async (data: Partial<UserUpdateInput>) => {
    try {
      const updatedUser = await authService.updateProfile(data);
      setUser(updatedUser);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Gagal memperbarui profil.",
      );
    }
  };

  // ============================================
  // CHANGE PASSWORD
  // ============================================

  const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
      await authService.changePassword(oldPassword, newPassword);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Gagal mengubah password.",
      );
    }
  };

  // ============================================
  // REFRESH USER DATA
  // ============================================

  const refreshUser = async () => {
    try {
      const userData = await authService.getProfile();
      setUser(userData);
    } catch (error) {
      console.error("Failed to refresh user:", error);
    }
  };

  // ============================================
  // CONTEXT VALUE
  // ============================================

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
    changePassword,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ============================================
// CUSTOM HOOK
// ============================================

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
