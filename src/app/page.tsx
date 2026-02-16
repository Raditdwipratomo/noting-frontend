// src/app/page.tsx
"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect ke dashboard jika sudah login
    if (!loading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">
                  StuntingCare
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition"
              >
                Daftar
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Cegah Stunting,
              <br />
              <span className="text-blue-600">Wujudkan Anak Sehat</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Monitor pertumbuhan dan perkembangan anak Anda dengan mudah.
              Dapatkan rekomendasi gizi yang tepat untuk mencegah stunting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition text-center"
              >
                Mulai Sekarang
              </Link>
              <Link
                href="/login"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition text-center"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="bg-blue-100 rounded-3xl p-8">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    👶
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Anak Sehat</h3>
                    <p className="text-sm text-gray-600">2 tahun 3 bulan</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Tinggi Badan</span>
                    <span className="font-semibold text-green-600">Normal</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Berat Badan</span>
                    <span className="font-semibold text-green-600">Normal</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status Gizi</span>
                    <span className="font-semibold text-green-600">Baik</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg
                      className="w-4 h-4 mr-2 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Monitoring rutin aktif
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Fitur Lengkap untuk Monitoring Tumbuh Kembang
          </h2>
          <p className="text-xl text-gray-600">
            Semua yang Anda butuhkan untuk memastikan anak tumbuh sehat
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Monitoring Pertumbuhan
            </h3>
            <p className="text-gray-600">
              Catat dan pantau tinggi badan, berat badan, serta lingkar kepala
              anak sesuai standar WHO
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Rekomendasi Gizi
            </h3>
            <p className="text-gray-600">
              Dapatkan rencana menu makanan harian yang disesuaikan dengan
              kebutuhan nutrisi anak
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Reminder Makan
            </h3>
            <p className="text-gray-600">
              Notifikasi otomatis untuk mengingatkan jadwal makan anak agar
              tidak terlewat
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-white mb-2">1000+</div>
              <div className="text-blue-100">Orang Tua Terdaftar</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">95%</div>
              <div className="text-blue-100">Tingkat Kepuasan</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">5000+</div>
              <div className="text-blue-100">Data Pertumbuhan Tercatat</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Cara Menggunakan
          </h2>
          <p className="text-xl text-gray-600">Mudah dan cepat untuk memulai</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Daftar Akun
            </h3>
            <p className="text-gray-600">
              Buat akun gratis dalam hitungan detik
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Tambah Data Anak
            </h3>
            <p className="text-gray-600">Masukkan informasi dasar anak Anda</p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Catat Pertumbuhan
            </h3>
            <p className="text-gray-600">
              Update tinggi dan berat badan secara berkala
            </p>
          </div>

          {/* Step 4 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              4
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Pantau Perkembangan
            </h3>
            <p className="text-gray-600">Lihat grafik dan rekomendasi gizi</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Siap Mulai Monitoring Tumbuh Kembang Anak?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Daftar sekarang dan dapatkan akses ke semua fitur secara gratis
          </p>
          <Link
            href="/register"
            className="inline-block bg-white text-blue-600 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
          >
            Daftar Gratis Sekarang
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">StuntingCare</h3>
              <p className="text-gray-400">
                Solusi digital untuk monitoring dan mencegah stunting pada anak
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produk</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Fitur
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Harga
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Kontak
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Privasi
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Syarat & Ketentuan
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 StuntingCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
