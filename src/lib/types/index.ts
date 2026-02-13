// ============================================
// TYPE EXPORTS - MAIN INDEX
// ============================================

export * from "./database.types";

// Re-export commonly used types for convenience
export type {
  // User related
  User,
  UserResponse,
  UserCreateInput,
  UserUpdateInput,

  // Anak related
  Anak,
  AnakWithUser,
  AnakWithAge,
  AnakCreateInput,
  AnakUpdateInput,

  // Pertumbuhan related
  PertumbuhanAnak,
  PertumbuhanAnakWithAnak,
  PertumbuhanAnakCreateInput,
  PertumbuhanAnakUpdateInput,

  // Diagnosa related
  RiwayatDiagnosa,
  RiwayatDiagnosaWithDetails,
  RiwayatDiagnosaCreateInput,

  // Gizi related
  RencanaGiziMingguan,
  RencanaGiziMingguanWithDetails,
  RekomendasiHarian,
  RekomendasiHarianWithDetails,
  DetailMakananHarian,
  DetailMakananHarianWithNutrisi,
  NutrisiMakanan,

  // Reminder & Alergi
  ReminderMakan,
  AlergiAnak,

  // API related
  ApiResponse,
  ApiErrorResponse,
  PaginatedResponse,
  PaginationParams,
  PaginationMeta,

  // Stats & Analytics
  DashboardStats,
  PertumbuhanStats,
  DiagnosaStats,
  NutrisiStats,
  ProgressStats,

  // Charts
  GrowthChartData,
  NutrisiChartData,
  ChartDataPoint,
} from "./database.types";
