// src/lib/data/pertumbuhan-data.ts
// Dummy data for the Pertumbuhan (Growth) page

export interface ZScoreStat {
  label: string;
  value: string;
  status: string;
  statusColor: "amber" | "emerald" | "rose";
}

export interface GrowthDataPoint {
  month: string;
  x: number;
  y: number;
}

export interface AIRecommendation {
  id: string;
  icon: string;
  iconBg: string;
  title: string;
  description: string;
  actionLabel: string;
  actionIcon: string;
  actionColor: string;
  variant: "primary" | "default";
}

export interface DiagnosisRecord {
  id: string;
  date: string;
  location: string;
  status: "Berisiko" | "Normal";
  statusColor: "amber" | "emerald";
  height: string;
  weight: string;
  isLatest?: boolean;
}

// ─── Diagnosis Status ────────────────────────────────────

export const diagnosisStatus = {
  label: "Berisiko Stunting",
  updatedAt: "15 Okt 2023",
  description:
    "Pertumbuhan tinggi badan Budi sedikit tertinggal dibandingkan standar usia. Perlu perhatian khusus pada asupan protein dan stimulasi fisik.",
};

export const zScoreStats: ZScoreStat[] = [
  { label: "TB/U", value: "-1.8 SD", status: "Pendek", statusColor: "amber" },
  { label: "BB/U", value: "-0.5 SD", status: "Normal", statusColor: "emerald" },
  { label: "BB/TB", value: "0.2 SD", status: "Gizi Baik", statusColor: "emerald" },
];

// ─── Growth Trend Chart ──────────────────────────────────

export const growthDataPoints: GrowthDataPoint[] = [
  { month: "Mei", x: 0, y: 85 },
  { month: "Jun", x: 20, y: 80 },
  { month: "Jul", x: 40, y: 82 },
  { month: "Ags", x: 60, y: 70 },
  { month: "Sep", x: 80, y: 65 },
  { month: "Okt", x: 100, y: 55 },
];

export const chartZones = [
  {
    height: "40%",
    bgColor: "bg-emerald-50/50",
    borderColor: "border-emerald-100/50",
    label: "Normal (+2 ke -1 SD)",
    labelColor: "text-emerald-600/60",
  },
  {
    height: "30%",
    bgColor: "bg-amber-50/50",
    borderColor: "border-amber-100/50",
    label: "Resiko Stunting (-1 ke -2 SD)",
    labelColor: "text-amber-600/60",
  },
  {
    height: "30%",
    bgColor: "bg-rose-50/50",
    borderColor: "",
    label: "Stunting (<-2 SD)",
    labelColor: "text-rose-600/60",
  },
];

export const trendInsight = {
  title: "Tren Membaik",
  description:
    "Garis pertumbuhan mulai mendekati area hijau. Pertahankan pola makan saat ini untuk mencapai tinggi ideal dalam 3 bulan ke depan.",
};

// ─── AI Recommendations ──────────────────────────────────

export const aiRecommendations: AIRecommendation[] = [
  {
    id: "1",
    icon: "egg_alt",
    iconBg: "bg-primary",
    title: "Tingkatkan Protein Hewani",
    description:
      "Berdasarkan data TB/U, Budi membutuhkan tambahan <strong>15g protein</strong> harian. Coba menu telur atau ikan kembung.",
    actionLabel: "Lihat Resep Terkait",
    actionIcon: "arrow_forward",
    actionColor: "text-primary hover:text-teal-700",
    variant: "primary",
  },
  {
    id: "2",
    icon: "bedtime",
    iconBg: "bg-secondary",
    title: "Pantau Jam Tidur",
    description:
      "Hormon pertumbuhan bekerja maksimal saat tidur malam. Pastikan tidur sebelum jam 20:00.",
    actionLabel: "Atur Pengingat Tidur",
    actionIcon: "alarm_add",
    actionColor: "text-secondary hover:text-rose-700",
    variant: "default",
  },
];

// ─── Diagnosis History ───────────────────────────────────

export const diagnosisHistory: DiagnosisRecord[] = [
  {
    id: "1",
    date: "15 Okt 2023",
    location: "Posyandu Melati",
    status: "Berisiko",
    statusColor: "amber",
    height: "88cm",
    weight: "12.5kg",
    isLatest: true,
  },
  {
    id: "2",
    date: "15 Sep 2023",
    location: "Puskesmas Kota",
    status: "Berisiko",
    statusColor: "amber",
    height: "87.5cm",
    weight: "12.2kg",
  },
  {
    id: "3",
    date: "15 Ags 2023",
    location: "Posyandu Melati",
    status: "Normal",
    statusColor: "emerald",
    height: "87cm",
    weight: "12.0kg",
  },
];
