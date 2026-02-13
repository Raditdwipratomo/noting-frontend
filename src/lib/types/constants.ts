// ============================================
// CONSTANTS
// ============================================

import {
  JenisKelamin,
  StatusStunting,
  StatusRekomendasi,
  WaktuMakan,
  TipeNotifikasi,
  TingkatKeparahan,
  KategoriPertumbuhan,
} from "./database.types";

// ============================================
// ENUM LABELS
// ============================================

export const JENIS_KELAMIN_LABELS: Record<JenisKelamin, string> = {
  [JenisKelamin.LAKI_LAKI]: "Laki-laki",
  [JenisKelamin.PEREMPUAN]: "Perempuan",
};

export const STATUS_STUNTING_LABELS: Record<StatusStunting, string> = {
  [StatusStunting.NORMAL]: "Normal",
  [StatusStunting.BERISIKO]: "Berisiko Stunting",
  [StatusStunting.STUNTING]: "Stunting",
  [StatusStunting.SEVERELY_STUNTED]: "Stunting Parah",
};

export const STATUS_REKOMENDASI_LABELS: Record<StatusRekomendasi, string> = {
  [StatusRekomendasi.BELUM_DIMULAI]: "Belum Dimulai",
  [StatusRekomendasi.SEDANG_BERJALAN]: "Sedang Berjalan",
  [StatusRekomendasi.SELESAI]: "Selesai",
};

export const WAKTU_MAKAN_LABELS: Record<WaktuMakan, string> = {
  [WaktuMakan.SUSU_PAGI]: "Susu Pagi",
  [WaktuMakan.MAKAN_PAGI]: "Sarapan",
  [WaktuMakan.SNACK_PAGI]: "Cemilan Pagi",
  [WaktuMakan.MAKAN_SIANG]: "Makan Siang",
  [WaktuMakan.SNACK_SORE]: "Cemilan Sore",
  [WaktuMakan.MAKAN_MALAM]: "Makan Malam",
  [WaktuMakan.SUSU_MALAM]: "Susu Malam",
};

export const TIPE_NOTIFIKASI_LABELS: Record<TipeNotifikasi, string> = {
  [TipeNotifikasi.PUSH]: "Push Notification",
  [TipeNotifikasi.EMAIL]: "Email",
  [TipeNotifikasi.WHATSAPP]: "WhatsApp",
  [TipeNotifikasi.SMS]: "SMS",
};

export const TINGKAT_KEPARAHAN_LABELS: Record<TingkatKeparahan, string> = {
  [TingkatKeparahan.RINGAN]: "Ringan",
  [TingkatKeparahan.SEDANG]: "Sedang",
  [TingkatKeparahan.BERAT]: "Berat",
};

export const KATEGORI_PERTUMBUHAN_LABELS: Record<KategoriPertumbuhan, string> =
  {
    [KategoriPertumbuhan.SANGAT_BURUK]: "Sangat Buruk",
    [KategoriPertumbuhan.BURUK]: "Buruk",
    [KategoriPertumbuhan.NORMAL]: "Normal",
    [KategoriPertumbuhan.BAIK]: "Baik",
    [KategoriPertumbuhan.SANGAT_BAIK]: "Sangat Baik",
  };

// ============================================
// COLOR CODES FOR UI
// ============================================

export const STATUS_STUNTING_COLORS: Record<StatusStunting, string> = {
  [StatusStunting.NORMAL]: "#10B981", // green
  [StatusStunting.BERISIKO]: "#F59E0B", // yellow
  [StatusStunting.STUNTING]: "#EF4444", // red
  [StatusStunting.SEVERELY_STUNTED]: "#DC2626", // dark red
};

export const KATEGORI_PERTUMBUHAN_COLORS: Record<KategoriPertumbuhan, string> =
  {
    [KategoriPertumbuhan.SANGAT_BURUK]: "#DC2626",
    [KategoriPertumbuhan.BURUK]: "#EF4444",
    [KategoriPertumbuhan.NORMAL]: "#10B981",
    [KategoriPertumbuhan.BAIK]: "#3B82F6",
    [KategoriPertumbuhan.SANGAT_BAIK]: "#8B5CF6",
  };

export const TINGKAT_KEPARAHAN_COLORS: Record<TingkatKeparahan, string> = {
  [TingkatKeparahan.RINGAN]: "#F59E0B",
  [TingkatKeparahan.SEDANG]: "#EF4444",
  [TingkatKeparahan.BERAT]: "#DC2626",
};

// ============================================
// WHO STANDARDS THRESHOLDS
// ============================================

export const Z_SCORE_THRESHOLDS = {
  SEVERELY_WASTED: -3,
  WASTED: -2,
  NORMAL_LOW: -2,
  NORMAL_HIGH: 2,
  OVERWEIGHT: 2,
  OBESE: 3,
} as const;

export const Z_SCORE_CATEGORIES = {
  HEIGHT_FOR_AGE: {
    SEVERELY_STUNTED: -3,
    STUNTED: -2,
    NORMAL_LOW: -2,
    NORMAL_HIGH: 2,
    TALL: 2,
  },
  WEIGHT_FOR_AGE: {
    SEVERELY_UNDERWEIGHT: -3,
    UNDERWEIGHT: -2,
    NORMAL_LOW: -2,
    NORMAL_HIGH: 2,
    OVERWEIGHT: 2,
  },
  WEIGHT_FOR_HEIGHT: {
    SEVERELY_WASTED: -3,
    WASTED: -2,
    NORMAL_LOW: -2,
    NORMAL_HIGH: 2,
    OVERWEIGHT: 2,
    OBESE: 3,
  },
} as const;

// ============================================
// RECOMMENDED DAILY INTAKE (RDI)
// ============================================

export const RDI_BY_AGE = {
  "0-6_MONTHS": {
    kalori: 550,
    protein: 9.1,
    karbohidrat: 60,
    lemak: 31,
    kalsium: 200,
    zat_besi: 0.27,
    zinc: 2,
    vitamin_a: 400,
    vitamin_d: 10,
    vitamin_c: 40,
  },
  "7-12_MONTHS": {
    kalori: 750,
    protein: 11,
    karbohidrat: 95,
    lemak: 30,
    kalsium: 260,
    zat_besi: 11,
    zinc: 3,
    vitamin_a: 500,
    vitamin_d: 10,
    vitamin_c: 50,
  },
  "1-3_YEARS": {
    kalori: 1000,
    protein: 13,
    karbohidrat: 130,
    lemak: 30,
    kalsium: 700,
    zat_besi: 7,
    zinc: 3,
    vitamin_a: 300,
    vitamin_d: 15,
    vitamin_c: 15,
  },
  "4-6_YEARS": {
    kalori: 1400,
    protein: 19,
    karbohidrat: 130,
    lemak: 25,
    kalsium: 1000,
    zat_besi: 10,
    zinc: 5,
    vitamin_a: 400,
    vitamin_d: 15,
    vitamin_c: 25,
  },
} as const;

// ============================================
// MEAL TIME SCHEDULES
// ============================================

export const DEFAULT_MEAL_TIMES: Record<WaktuMakan, string> = {
  [WaktuMakan.SUSU_PAGI]: "06:00:00",
  [WaktuMakan.MAKAN_PAGI]: "07:00:00",
  [WaktuMakan.SNACK_PAGI]: "10:00:00",
  [WaktuMakan.MAKAN_SIANG]: "12:00:00",
  [WaktuMakan.SNACK_SORE]: "15:00:00",
  [WaktuMakan.MAKAN_MALAM]: "18:00:00",
  [WaktuMakan.SUSU_MALAM]: "20:00:00",
};

export const MEAL_TIME_ORDER: WaktuMakan[] = [
  WaktuMakan.SUSU_PAGI,
  WaktuMakan.MAKAN_PAGI,
  WaktuMakan.SNACK_PAGI,
  WaktuMakan.MAKAN_SIANG,
  WaktuMakan.SNACK_SORE,
  WaktuMakan.MAKAN_MALAM,
  WaktuMakan.SUSU_MALAM,
];

// ============================================
// PAGINATION DEFAULTS
// ============================================

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

// ============================================
// AGE CALCULATION
// ============================================

export const AGE_RANGES = {
  INFANT: { min: 0, max: 12 }, // 0-12 bulan
  TODDLER: { min: 13, max: 36 }, // 1-3 tahun
  PRESCHOOL: { min: 37, max: 60 }, // 3-5 tahun
} as const;

// ============================================
// FILE UPLOAD LIMITS
// ============================================

export const FILE_UPLOAD_LIMITS = {
  PROFILE_PHOTO: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  },
} as const;

// ============================================
// NOTIFICATION MESSAGES
// ============================================

export const NOTIFICATION_MESSAGES = {
  MEAL_REMINDER: (waktuMakan: string, namaAnak: string) =>
    `⏰ Waktunya ${waktuMakan} untuk ${namaAnak}!`,
  GROWTH_MONITORING: (namaAnak: string) =>
    `📊 Saatnya mencatat pertumbuhan ${namaAnak}`,
  WEEKLY_REPORT: (namaAnak: string) =>
    `📈 Laporan mingguan ${namaAnak} sudah tersedia`,
  STUNTING_ALERT: (namaAnak: string) =>
    `⚠️ Perhatian: ${namaAnak} menunjukkan tanda-tanda berisiko stunting`,
} as const;

// ============================================
// ERROR MESSAGES
// ============================================

export const ERROR_MESSAGES = {
  VALIDATION_ERROR: "Data yang dimasukkan tidak valid",
  NOT_FOUND: "Data tidak ditemukan",
  UNAUTHORIZED: "Anda tidak memiliki akses",
  DUPLICATE_ENTRY: "Data sudah ada",
  SERVER_ERROR: "Terjadi kesalahan pada server",
  NETWORK_ERROR: "Koneksi bermasalah, silakan coba lagi",
} as const;

// ============================================
// SUCCESS MESSAGES
// ============================================

export const SUCCESS_MESSAGES = {
  CREATED: "Data berhasil ditambahkan",
  UPDATED: "Data berhasil diperbarui",
  DELETED: "Data berhasil dihapus",
  LOGIN_SUCCESS: "Login berhasil",
  REGISTER_SUCCESS: "Registrasi berhasil",
} as const;

// ============================================
// ROUTES
// ============================================

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  ANAK: {
    LIST: "/anak",
    DETAIL: (id: number) => `/anak/${id}`,
    ADD: "/anak/add",
    EDIT: (id: number) => `/anak/${id}/edit`,
  },
  PERTUMBUHAN: {
    LIST: (anakId: number) => `/anak/${anakId}/pertumbuhan`,
    ADD: (anakId: number) => `/anak/${anakId}/pertumbuhan/add`,
    DETAIL: (anakId: number, id: number) => `/anak/${anakId}/pertumbuhan/${id}`,
  },
  GIZI: {
    LIST: (anakId: number) => `/anak/${anakId}/gizi`,
    DETAIL: (anakId: number, id: number) => `/anak/${anakId}/gizi/${id}`,
  },
  PROFILE: "/profile",
} as const;

// ============================================
// API ENDPOINTS
// ============================================

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    LOGOUT: "/api/auth/logout",
    VERIFY: "/api/auth/verify",
    REFRESH: "/api/auth/refresh",
  },
  USERS: {
    GET_PROFILE: "/api/users/profile",
    UPDATE_PROFILE: "/api/users/profile",
  },
  ANAK: {
    LIST: "/api/anak",
    CREATE: "/api/anak",
    GET: (id: number) => `/api/anak/${id}`,
    UPDATE: (id: number) => `/api/anak/${id}`,
    DELETE: (id: number) => `/api/anak/${id}`,
  },
  PERTUMBUHAN: {
    LIST: (anakId: number) => `/api/anak/${anakId}/pertumbuhan`,
    CREATE: (anakId: number) => `/api/anak/${anakId}/pertumbuhan`,
    GET: (anakId: number, id: number) =>
      `/api/anak/${anakId}/pertumbuhan/${id}`,
    UPDATE: (anakId: number, id: number) =>
      `/api/anak/${anakId}/pertumbuhan/${id}`,
    DELETE: (anakId: number, id: number) =>
      `/api/anak/${anakId}/pertumbuhan/${id}`,
  },
  DIAGNOSA: {
    LIST: (anakId: number) => `/api/anak/${anakId}/diagnosa`,
    CREATE: (anakId: number) => `/api/anak/${anakId}/diagnosa`,
    GET: (anakId: number, id: number) => `/api/anak/${anakId}/diagnosa/${id}`,
  },
  GIZI: {
    LIST: (anakId: number) => `/api/anak/${anakId}/gizi`,
    CREATE: (anakId: number) => `/api/anak/${anakId}/gizi`,
    GET: (anakId: number, id: number) => `/api/anak/${anakId}/gizi/${id}`,
    UPDATE: (anakId: number, id: number) => `/api/anak/${anakId}/gizi/${id}`,
  },
  REKOMENDASI: {
    LIST: (anakId: number, rencanaId: number) =>
      `/api/anak/${anakId}/gizi/${rencanaId}/rekomendasi`,
    GET: (anakId: number, rencanaId: number, id: number) =>
      `/api/anak/${anakId}/gizi/${rencanaId}/rekomendasi/${id}`,
    UPDATE_STATUS: (anakId: number, rencanaId: number, id: number) =>
      `/api/anak/${anakId}/gizi/${rencanaId}/rekomendasi/${id}/status`,
  },
  REMINDER: {
    LIST: (anakId: number) => `/api/anak/${anakId}/reminder`,
    CREATE: (anakId: number) => `/api/anak/${anakId}/reminder`,
    UPDATE: (anakId: number, id: number) =>
      `/api/anak/${anakId}/reminder/${id}`,
    DELETE: (anakId: number, id: number) =>
      `/api/anak/${anakId}/reminder/${id}`,
  },
  ALERGI: {
    LIST: (anakId: number) => `/api/anak/${anakId}/alergi`,
    CREATE: (anakId: number) => `/api/anak/${anakId}/alergi`,
    UPDATE: (anakId: number, id: number) => `/api/anak/${anakId}/alergi/${id}`,
    DELETE: (anakId: number, id: number) => `/api/anak/${anakId}/alergi/${id}`,
  },
  STATS: {
    DASHBOARD: (anakId: number) => `/api/anak/${anakId}/stats/dashboard`,
    GROWTH_CHART: (anakId: number) => `/api/anak/${anakId}/stats/growth-chart`,
    NUTRITION: (anakId: number) => `/api/anak/${anakId}/stats/nutrition`,
  },
} as const;

// ============================================
// CHART COLORS
// ============================================

export const CHART_COLORS = {
  PRIMARY: "#3B82F6",
  SUCCESS: "#10B981",
  WARNING: "#F59E0B",
  DANGER: "#EF4444",
  INFO: "#06B6D4",
  PURPLE: "#8B5CF6",
  PINK: "#EC4899",
} as const;

export const GROWTH_CHART_COLORS = {
  ACTUAL: CHART_COLORS.PRIMARY,
  MEDIAN: CHART_COLORS.SUCCESS,
  MINUS_2SD: CHART_COLORS.WARNING,
  PLUS_2SD: CHART_COLORS.WARNING,
  MINUS_3SD: CHART_COLORS.DANGER,
  PLUS_3SD: CHART_COLORS.DANGER,
} as const;
