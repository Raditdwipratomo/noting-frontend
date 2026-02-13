import { UserResponse } from "./database.types";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  nama_lengkap: string;
  no_telepon?: string;
  alamat?: string;
}

export interface AuthResponse {
  user: UserResponse;
  accessToken: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}
