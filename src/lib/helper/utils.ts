// ============================================
// UTILITY HELPER FUNCTIONS
// ============================================

import {
  JenisKelamin,
  StatusStunting,
  KategoriPertumbuhan,
  Anak,
  PertumbuhanAnak,
  StandarWHO,
  ZScoreResult,
  ZScoreCalculation,
} from "../types/database.types";
import { Z_SCORE_THRESHOLDS, Z_SCORE_CATEGORIES } from "../types/constants";

// ============================================
// DATE UTILITIES
// ============================================

/**
 * Calculate age in months from birth date
 */
export function calculateAgeInMonths(birthDate: Date | string): number {
  const birth = new Date(birthDate);
  const now = new Date();

  const yearDiff = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();

  return yearDiff * 12 + monthDiff;
}

/**
 * Calculate age in years and months
 */
export function calculateAge(birthDate: Date | string): {
  years: number;
  months: number;
} {
  const totalMonths = calculateAgeInMonths(birthDate);
  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
  };
}

/**
 * Format age display
 */
export function formatAge(birthDate: Date | string): string {
  const { years, months } = calculateAge(birthDate);

  if (years === 0) {
    return `${months} bulan`;
  }

  if (months === 0) {
    return `${years} tahun`;
  }

  return `${years} tahun ${months} bulan`;
}

/**
 * Format date to Indonesian format
 */
export function formatDate(
  date: Date | string,
  format: "short" | "long" = "short",
): string {
  const d = new Date(date);

  if (format === "short") {
    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return d.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Check if date is today
 */
export function isToday(date: Date | string): boolean {
  const d = new Date(date);
  const today = new Date();

  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
}

/**
 * Get week number of year
 */
export function getWeekNumber(date: Date | string): number {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const week1 = new Date(d.getFullYear(), 0, 4);
  return (
    1 +
    Math.round(
      ((d.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7,
    )
  );
}

// ============================================
// Z-SCORE CALCULATIONS
// ============================================

/**
 * Calculate Z-score using LMS method
 * Z = ((value/M)^L - 1) / (L * S)
 */
function calculateZScoreLMS(
  value: number,
  median: number,
  l: number = 0,
  s: number = 1,
): number {
  if (l === 0) {
    return Math.log(value / median) / s;
  }
  return (Math.pow(value / median, l) - 1) / (l * s);
}

/**
 * Calculate Z-score for Height-for-Age (TB/U)
 */
export function calculateHeightForAgeZScore(
  heightCm: number,
  standar: StandarWHO,
): ZScoreResult {
  if (!standar.tb_median || !standar.tb_minus_2sd) {
    return {
      value: 0,
      status: "unknown",
      kategori: "Data standar tidak tersedia",
    };
  }

  // Simplified Z-score calculation
  const sd = standar.tb_median - standar.tb_minus_2sd;
  const zScore = (heightCm - standar.tb_median) / sd;

  let status: string;
  let kategori: string;

  if (zScore < -3) {
    status = StatusStunting.SEVERELY_STUNTED;
    kategori = "Sangat Pendek (Severely Stunted)";
  } else if (zScore < -2) {
    status = StatusStunting.STUNTING;
    kategori = "Pendek (Stunted)";
  } else if (zScore <= 2) {
    status = StatusStunting.NORMAL;
    kategori = "Normal";
  } else if (zScore <= 3) {
    status = "tall";
    kategori = "Tinggi";
  } else {
    status = "very_tall";
    kategori = "Sangat Tinggi";
  }

  return { value: parseFloat(zScore.toFixed(2)), status, kategori };
}

/**
 * Calculate Z-score for Weight-for-Age (BB/U)
 */
export function calculateWeightForAgeZScore(
  weightKg: number,
  standar: StandarWHO,
): ZScoreResult {
  if (!standar.bb_median || !standar.bb_minus_2sd) {
    return {
      value: 0,
      status: "unknown",
      kategori: "Data standar tidak tersedia",
    };
  }

  const sd = standar.bb_median - standar.bb_minus_2sd;
  const zScore = (weightKg - standar.bb_median) / sd;

  let status: string;
  let kategori: string;

  if (zScore < -3) {
    status = "severely_underweight";
    kategori = "Gizi Buruk";
  } else if (zScore < -2) {
    status = "underweight";
    kategori = "Gizi Kurang";
  } else if (zScore <= 1) {
    status = "normal";
    kategori = "Normal";
  } else if (zScore <= 2) {
    status = "possible_risk_overweight";
    kategori = "Berisiko Gizi Lebih";
  } else {
    status = "overweight";
    kategori = "Gizi Lebih";
  }

  return { value: parseFloat(zScore.toFixed(2)), status, kategori };
}

/**
 * Calculate Z-score for Weight-for-Height (BB/TB)
 * Simplified version - in production, use WHO tables based on height
 */
export function calculateWeightForHeightZScore(
  weightKg: number,
  heightCm: number,
  jenis_kelamin: JenisKelamin,
): ZScoreResult | null {
  // This is a simplified BMI-based approach
  // In production, you should use WHO weight-for-height tables
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  // Rough BMI thresholds for children
  let status: string;
  let kategori: string;
  let zScore: number;

  if (bmi < 13) {
    status = "severely_wasted";
    kategori = "Sangat Kurus (Severely Wasted)";
    zScore = -3;
  } else if (bmi < 14.5) {
    status = "wasted";
    kategori = "Kurus (Wasted)";
    zScore = -2;
  } else if (bmi <= 17) {
    status = "normal";
    kategori = "Normal";
    zScore = 0;
  } else if (bmi <= 18.5) {
    status = "possible_risk_overweight";
    kategori = "Berisiko Gemuk";
    zScore = 2;
  } else {
    status = "overweight";
    kategori = "Gemuk";
    zScore = 3;
  }

  return { value: parseFloat(zScore.toFixed(2)), status, kategori };
}

/**
 * Calculate all Z-scores for a child
 */
export function calculateAllZScores(
  pertumbuhan: PertumbuhanAnak,
  standar: StandarWHO,
  anak: Anak,
): ZScoreCalculation {
  const heightZScore = calculateHeightForAgeZScore(
    pertumbuhan.tinggi_badan_cm,
    standar,
  );
  const weightZScore = calculateWeightForAgeZScore(
    pertumbuhan.berat_badan_kg,
    standar,
  );
  const weightHeightZScore = calculateWeightForHeightZScore(
    pertumbuhan.berat_badan_kg,
    pertumbuhan.tinggi_badan_cm,
    anak.jenis_kelamin,
  );

  let headCircZScore: ZScoreResult | null = null;
  if (
    pertumbuhan.lingkar_kepala_cm &&
    standar.lk_median &&
    standar.lk_minus_2sd
  ) {
    const sd = standar.lk_median - standar.lk_minus_2sd;
    const zScore = (pertumbuhan.lingkar_kepala_cm - standar.lk_median) / sd;

    let status: string;
    let kategori: string;

    if (zScore < -3) {
      status = "microcephaly_severe";
      kategori = "Mikrosefali Berat";
    } else if (zScore < -2) {
      status = "microcephaly";
      kategori = "Mikrosefali";
    } else if (zScore <= 2) {
      status = "normal";
      kategori = "Normal";
    } else if (zScore <= 3) {
      status = "macrocephaly";
      kategori = "Makrosefali";
    } else {
      status = "macrocephaly_severe";
      kategori = "Makrosefali Berat";
    }

    headCircZScore = { value: parseFloat(zScore.toFixed(2)), status, kategori };
  }

  let muacZScore: ZScoreResult | null = null;
  if (
    pertumbuhan.lingkar_lengan_atas_cm &&
    standar.lila_median &&
    standar.lila_minus_2sd
  ) {
    const sd = standar.lila_median - standar.lila_minus_2sd;
    const zScore =
      (pertumbuhan.lingkar_lengan_atas_cm - standar.lila_median) / sd;

    let status: string;
    let kategori: string;

    if (zScore < -3) {
      status = "severe_acute_malnutrition";
      kategori = "Malnutrisi Akut Berat";
    } else if (zScore < -2) {
      status = "acute_malnutrition";
      kategori = "Malnutrisi Akut";
    } else {
      status = "normal";
      kategori = "Normal";
    }

    muacZScore = { value: parseFloat(zScore.toFixed(2)), status, kategori };
  }

  return {
    z_score_tinggi_badan: heightZScore,
    z_score_berat_badan: weightZScore,
    z_score_berat_tinggi: weightHeightZScore,
    z_score_lingkar_kepala: headCircZScore,
    z_score_lingkar_lengan: muacZScore,
  };
}

/**
 * Determine overall stunting status
 */
export function determineStuntingStatus(
  zScores: ZScoreCalculation,
): StatusStunting {
  const heightZScore = zScores.z_score_tinggi_badan.value;

  if (heightZScore < -3) {
    return StatusStunting.SEVERELY_STUNTED;
  } else if (heightZScore < -2) {
    return StatusStunting.STUNTING;
  } else if (heightZScore < -1) {
    return StatusStunting.BERISIKO;
  } else {
    return StatusStunting.NORMAL;
  }
}

// ============================================
// NUTRITION UTILITIES
// ============================================

/**
 * Calculate percentage of RDI met
 */
export function calculateRDIPercentage(actual: number, rdi: number): number {
  return Math.round((actual / rdi) * 100);
}

/**
 * Get nutrition status color
 */
export function getNutritionStatusColor(percentage: number): string {
  if (percentage < 50) return "#EF4444"; // red
  if (percentage < 80) return "#F59E0B"; // yellow
  if (percentage <= 120) return "#10B981"; // green
  return "#F59E0B"; // yellow (over 120%)
}

// ============================================
// PROGRESS UTILITIES
// ============================================

/**
 * Calculate progress percentage
 */
export function calculateProgressPercentage(
  completed: number,
  total: number,
): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

/**
 * Calculate streak days
 */
export function calculateStreak(dates: Date[]): number {
  if (dates.length === 0) return 0;

  const sortedDates = dates
    .map((d) => new Date(d).setHours(0, 0, 0, 0))
    .sort((a, b) => b - a);

  let streak = 1;
  let currentDate = sortedDates[0];

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = sortedDates[i];
    const diffDays = (currentDate - prevDate) / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      streak++;
      currentDate = prevDate;
    } else if (diffDays > 1) {
      break;
    }
  }

  return streak;
}

// ============================================
// VALIDATION UTILITIES
// ============================================

/**
 * Validate Indonesian phone number
 */
export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
  return phoneRegex.test(phone);
}

/**
 * Validate email
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  strength: "weak" | "medium" | "strong";
  message: string;
} {
  if (password.length < 8) {
    return {
      isValid: false,
      strength: "weak",
      message: "Password minimal 8 karakter",
    };
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const criteriaMet = [
    hasUpperCase,
    hasLowerCase,
    hasNumbers,
    hasSpecialChar,
  ].filter(Boolean).length;

  if (criteriaMet < 2) {
    return {
      isValid: false,
      strength: "weak",
      message: "Password terlalu lemah",
    };
  } else if (criteriaMet < 3) {
    return {
      isValid: true,
      strength: "medium",
      message: "Password cukup kuat",
    };
  } else {
    return {
      isValid: true,
      strength: "strong",
      message: "Password sangat kuat",
    };
  }
}

// ============================================
// FORMATTING UTILITIES
// ============================================

/**
 * Format number to Indonesian locale
 */
export function formatNumber(num: number, decimals: number = 0): string {
  return num.toLocaleString("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format currency to Rupiah
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format weight display
 */
export function formatWeight(kg: number): string {
  return `${formatNumber(kg, 2)} kg`;
}

/**
 * Format height display
 */
export function formatHeight(cm: number): string {
  return `${formatNumber(cm, 1)} cm`;
}

/**
 * Truncate text
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

// ============================================
// ARRAY UTILITIES
// ============================================

/**
 * Group array by key
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce(
    (result, item) => {
      const groupKey = String(item[key]);
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    },
    {} as Record<string, T[]>,
  );
}

/**
 * Sort array by date
 */
export function sortByDate<T extends { [key: string]: any }>(
  array: T[],
  dateKey: keyof T,
  order: "asc" | "desc" = "desc",
): T[] {
  return [...array].sort((a, b) => {
    const dateA = new Date(a[dateKey]).getTime();
    const dateB = new Date(b[dateKey]).getTime();
    return order === "asc" ? dateA - dateB : dateB - dateA;
  });
}

/**
 * Get unique values from array
 */
export function getUniqueValues<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

// ============================================
// EXPORT ALL
// ============================================

export const utils = {
  // Date utilities
  calculateAgeInMonths,
  calculateAge,
  formatAge,
  formatDate,
  isToday,
  getWeekNumber,

  // Z-score calculations
  calculateHeightForAgeZScore,
  calculateWeightForAgeZScore,
  calculateWeightForHeightZScore,
  calculateAllZScores,
  determineStuntingStatus,

  // Nutrition utilities
  calculateRDIPercentage,
  getNutritionStatusColor,

  // Progress utilities
  calculateProgressPercentage,
  calculateStreak,

  // Validation utilities
  validatePhoneNumber,
  validateEmail,
  validatePasswordStrength,

  // Formatting utilities
  formatNumber,
  formatCurrency,
  formatWeight,
  formatHeight,
  truncateText,

  // Array utilities
  groupBy,
  sortByDate,
  getUniqueValues,
};
