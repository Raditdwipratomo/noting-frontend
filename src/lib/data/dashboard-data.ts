// src/lib/data/dashboard-data.ts
// Dummy data for the NutriStunting dashboard

export interface NutritionStat {
  label: string;
  value: string;
  unit: string;
  subtext: string;
  colorScheme: "blue" | "orange" | "purple" | "emerald";
}

export interface GuideCard {
  id: string;
  category: string;
  categoryColor: "orange" | "purple";
  title: string;
  description: string;
  image: string;
  meta: { icon: string; text: string }[];
}

export interface ChildProfile {
  id: string;
  name: string;
  age: string;
  photo: string;
  isActive: boolean;
}

export interface ChecklistItem {
  id: string;
  timeOfDay: "pagi" | "siang" | "malam";
  timeIcon: string;
  title: string;
  timeDetail: string;
  isCompleted: boolean;
  tags?: { label: string; color: string }[];
}

// ─── Active Child Data ───────────────────────────────────

export const activeChild = {
  name: "Budi Santoso",
  age: "2 Tahun 4 Bulan",
  gender: "Laki-laki",
  status: "Normal",
  photo:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD5B_5UA_fCPTmxCcd_oF64OuVlBch11g7ACe3KAqPpvqWxBQKPoBmZgAAa4rDMz16j4eR93MGsHeUUzwHFvWqP4kykgy924erKNYGT8zmU8e5HrcUdddAnrD0GibDioDpc1nwGTvdYweo00IpazV9ZOtlg-2qOOz-cWACydNkUY-cVUnM7GtNS0lBl615xEGERU9jXwlW6YIbke2DsJuiM2M5oBstpTFpOHw5L2K_ZhudS-OP2InJqb6-Z9x3rBliFlz1_HG61D3U",
  summary:
    'Pertumbuhan Budi sangat baik bulan ini! Berat badan naik <span class="text-emerald-600 font-bold">+0.5kg</span> dari bulan lalu. Pertahankan asupan protein hewani dan sayuran untuk mencegah stunting.',
};

export const nutritionStats: NutritionStat[] = [
  {
    label: "Tinggi Badan",
    value: "88",
    unit: "cm",
    subtext: "Z-Score: -0.5 SD",
    colorScheme: "blue",
  },
  {
    label: "Berat Badan",
    value: "12.5",
    unit: "kg",
    subtext: "Z-Score: +0.2 SD",
    colorScheme: "orange",
  },
  {
    label: "Lingkar Kepala",
    value: "48",
    unit: "cm",
    subtext: "Normal",
    colorScheme: "purple",
  },
];

// ─── Guide Cards ─────────────────────────────────────────

export const guideCards: GuideCard[] = [
  {
    id: "1",
    category: "Resep MPASI",
    categoryColor: "orange",
    title: "Bubur Ikan Kembung & Bayam",
    description:
      "Kaya akan Omega-3 dan Zat Besi untuk perkembangan otak dan pertumbuhan fisik.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBOtyADajS046CyqAysUquENbJBiCDp0AZFI2g6byIJR3OfiJgzhstr73ko4T9kpMSEk0sKiQ_x2ld0t9htFbqTrNNpySN0XpRzHA5BqQMELFITxl_h7cX32YP8bxmlkZaWldobRj0tlbtJ5OVXNQog9PUFY0Sm2qMExBsYWridrTC8o36vLWF9tQLUXoEwYNmTNSAIAex50SudSsNtbCAiosYig1ZP6QRmz8CD0F0psr7Sk9DfY9yUINJqbmy7_P-rAwsY4M878sA",
    meta: [
      { icon: "clock", text: "30 mnt" },
      { icon: "flame", text: "150 kkal" },
    ],
  },
  {
    id: "2",
    category: "Stimulasi Motorik",
    categoryColor: "purple",
    title: "Bermain Susun Balok",
    description:
      "Melatih koordinasi mata-tangan dan motorik halus anak usia 2-3 tahun.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXn_JLibS6GiW-BpkRRv-Jo_zchVmZwMqxUaxw4eMYcRR1kzikujxhTFwGHPiOXIlid49IlImGawjLbvrAWOgLcKc1BChDXJaF6TlCzuB-QQQmH8HB3e0TyHjPygfF1iPcGGhTTL_DlH5oyhZV98qMSoZRvr3Era-3QWY-Q7Cyr5yn34U8KrqOkIH6P_IPihiXpUGyvpFHsYubzU7i7QfMygcIMmEdZlkFzWL3tpzPABVAWRM7w4qruCsj7khRdctt3uDb-OudVdY",
    meta: [{ icon: "baby", text: "Usia 2+ Thn" }],
  },
];

// ─── Child Profiles ──────────────────────────────────────

export const childProfiles: ChildProfile[] = [
  {
    id: "1",
    name: "Budi",
    age: "2 Thn 4 Bln",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAP_aL_1BUL4h0ySDB0ZG5-7X-0wpNoqSt4l86G3-_hRfQtCAREG8prEk0ucpXf4MP3RDOwrdr6GfQNmtGzygJcks2EYwthJD9FMcjoG67jb-Uc8FkG-5xfxfg98oZEU3YcVFl7a2-BOzuCv2j-dXZuyFCJmr170RvjTdqPaISMQfwiQUzJSSjmBwiW31wE303Lqm-0hUHz9jNU_Gjbltx-WFhqQsyciNhxUV-8VxVBcfIs4EYUumLLHvjm8uTDWWx-mBqZoNDwitw",
    isActive: true,
  },
  {
    id: "2",
    name: "Siti",
    age: "5 Bulan",
    photo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCGJUDHmzhbZKuoJkn6jvIhqmg_ZaaaydJovKoSP89eqPR1ExaeUUMt9B88y3qn0-ejsFbfgM-PzGFxUMyBr0ghUKkBqhXQ_oZDNil4X6oyjGFtbQBlkIQJhNtm8FZcpWUivOAoJs-0UpoWmIOtNbS3HXENkfAyawrAyMOhBEomzNinhKXJuIt775XUj87VAUTdfYjeHaKGBdIlR13DVfJhdxudMLsZMZqOWNYj2zlCk50DlR8UY1oSvzromqZAlGDI0NkjytNmh1M",
    isActive: false,
  },
];

// ─── Daily Checklist ─────────────────────────────────────

export const checklistItems: ChecklistItem[] = [
  {
    id: "1",
    timeOfDay: "pagi",
    timeIcon: "sunrise",
    title: "Bubur Ayam Sayur",
    timeDetail: "07:30 AM • Habis 1 mangkok",
    isCompleted: true,
  },
  {
    id: "2",
    timeOfDay: "siang",
    timeIcon: "sun",
    title: "Nasi Tim Hati Ayam",
    timeDetail: "Rencana: 12:30 PM",
    isCompleted: false,
    tags: [{ label: "Zat Besi Tinggi", color: "red" }],
  },
];

export const calorieProgress = {
  percentage: 75,
  remaining: 350,
  message: "Hampir Tercapai!",
};

export const posyanduReminder = {
  title: "Jadwal Posyandu",
  description:
    "Besok pagi, pukul 08:00 di Balai Desa. Jangan lupa bawa buku KIA.",
};

export const userProfile = {
  name: "Bunda",
  photo:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAbBRpT1M6ITxxHp_aRdGiGfonloHMgyHuCLaG863H4TJBkhj68OcL0RztbogGqdTgFRU8rkRKXxulwWbT6GUP042tbHV5QUbdGUiAiqHFkv52ly5Ltv94-mpxdvANPlIGJDkZWfaHpmWniPhvbkMfiCaha36vIa3wY1ZpF6nWqAEs-rZ5fPvnxACI9QYvmmhgITXvuyT_uTGEvM9iVeuKinkHSKTkfNgSTaSS7FKWzPxDKc6Ao5eoH_kSwGRoyKsQDzt6uNM7MvUs",
};
