// src/app/(auth)/register/page.tsx
"use client";

import { useState, FormEvent } from "react";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

import type { RegisterRequest } from "@/lib/types/auth.types";
import { Eye, EyeClosed } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterRequest>({
    username: "",
    email: "",
    password: "",
    nama_lengkap: "",
    no_telepon: "",
    alamat: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register } = useAuth();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.nama_lengkap
    ) {
      setError("Mohon lengkapi semua field yang wajib diisi");
      return false;
    }

    if (formData.password.length < 8) {
      setError("Password minimal 8 karakter");
      return false;
    }

    if (formData.password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await register(formData);
      // Redirect handled by AuthContext
    } catch (err: any) {
      setError(err.message || "Registrasi gagal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Buat Akun Baru
          </h1>
          <p className="text-gray-600">
            Daftar untuk memulai monitoring tumbuh kembang anak
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                placeholder="username123"
                required
                disabled={loading}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                placeholder="nama@email.com"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Nama Lengkap */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nama_lengkap"
              value={formData.nama_lengkap}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              placeholder="Nama lengkap Anda"
              required
              disabled={loading}
            />
          </div>

          {/* No Telepon */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              No. Telepon
            </label>
            <input
              type="tel"
              name="no_telepon"
              value={formData.no_telepon}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              placeholder="08123456789"
              disabled={loading}
            />
          </div>

          {/* Alamat */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alamat
            </label>
            <textarea
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700"
              placeholder="Alamat lengkap Anda"
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 text-gray-700"
                  placeholder="Min. 8 karakter"
                  required
                  disabled={loading}
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Konfirmasi Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 text-gray-700"
                  placeholder="Ulangi password"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <Eye /> : <EyeClosed />}
                </button>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start">
            <input
              id="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              Saya menyetujui{" "}
              <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                Syarat dan Ketentuan
              </Link>{" "}
              serta{" "}
              <Link
                href="/privacy"
                className="text-blue-600 hover:text-blue-500"
              >
                Kebijakan Privasi
              </Link>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Memproses...
              </span>
            ) : (
              "Daftar"
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
