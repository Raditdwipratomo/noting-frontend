"use client";
import Link from "next/link";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────────
//  THEME — ubah semua warna di sini saja
// ─────────────────────────────────────────────────────────────────
const theme = {
  // Brand / accent
  primary: "#ec4899", // pink-500
  primaryHover: "#db2777", // pink-600

  primaryLight: "#fff7ed", // orange-50
  primaryMid: "#fed7aa", // orange-200
  primaryGlow: "rgba(249,115,22,0.4)",
  primaryGlowSm: "rgba(249,115,22,0.35)",

  // Secondary accent
  secondary: "#f9a8d4", // pink-300
  secondaryLight: "#f0f9ff", // sky-50
  secondaryMid: "#bae6fd", // sky-200

  // Success / healthy
  success: "#10b981", // emerald-500
  successLight: "#d1fae5", // emerald-100
  successDark: "#065f46", // emerald-800

  // Page backgrounds
  heroBg: "#f5f0eb", // warm cream
  sectionBg: "#fdf8f5", // warm off-white
  pageBg: "#ffffff",

  // Text
  textPrimary: "#111827", // gray-900
  textMuted: "#6b7280", // gray-500
  textSubtle: "#9ca3af", // gray-400
  textOnDark: "#ffffff",

  // Dark surfaces
  darkBg: "#030712", // gray-950
  darkCard: "#1f2937", // gray-800
  darkCardInner: "#111827", // gray-900
  darkText: "#9ca3af", // gray-400
  darkBorder: "rgba(255,255,255,0.06)",

  // Neutral
  border: "#f3f4f6", // gray-100
  borderMd: "#e5e7eb", // gray-200
  cardBg: "#f9fafb", // gray-50
  white: "#ffffff",
  phoneBg: "#111827", // gray-900 (phone frame)

  // Feature card palettes  [bg, iconBg]
  featureCards: [
    ["#f0f9ff", "#e0f2fe"], // sky
    ["#fff7ed", "#ffedd5"], // orange
    ["#f0fdf4", "#dcfce7"], // emerald
    ["#faf5ff", "#ede9fe"], // violet
    ["#fff1f2", "#ffe4e6"], // rose
    ["#fffbeb", "#fef3c7"], // amber
  ],
};

// ─── CSS variable injection (one <style> block, no other global CSS) ──
const cssVars = `
  :root {
    --c-primary:       ${theme.primary};
    --c-primary-hover: ${theme.primaryHover};
    --c-primary-light: ${theme.primaryLight};
    --c-primary-mid:   ${theme.primaryMid};
    --c-primary-glow:  ${theme.primaryGlow};
    --c-secondary:     ${theme.secondary};
    --c-secondary-lt:  ${theme.secondaryLight};
    --c-success:       ${theme.success};
    --c-success-lt:    ${theme.successLight};
    --c-success-dk:    ${theme.successDark};
    --c-hero-bg:       ${theme.heroBg};
    --c-section-bg:    ${theme.sectionBg};
    --c-text:          ${theme.textPrimary};
    --c-muted:         ${theme.textMuted};
    --c-subtle:        ${theme.textSubtle};
    --c-dark-bg:       ${theme.darkBg};
    --c-dark-card:     ${theme.darkCard};
    --c-dark-inner:    ${theme.darkCardInner};
    --c-dark-text:     ${theme.darkText};
    --c-dark-border:   ${theme.darkBorder};
    --c-border:        ${theme.border};
    --c-border-md:     ${theme.borderMd};
    --c-card-bg:       ${theme.cardBg};
    --c-white:         ${theme.white};
    --c-phone-bg:      ${theme.phoneBg};
  }

  /* Utility classes that use CSS vars */
  .bg-primary        { background-color: var(--c-primary) !important; }
  .bg-primary-light  { background-color: var(--c-primary-light) !important; }
  .bg-secondary-lt   { background-color: var(--c-secondary-lt) !important; }
  .bg-success-lt     { background-color: var(--c-success-lt) !important; }
  .bg-hero           { background-color: var(--c-hero-bg) !important; }
  .bg-section        { background-color: var(--c-section-bg) !important; }
  .bg-dark           { background-color: var(--c-dark-bg) !important; }
  .bg-dark-card      { background-color: var(--c-dark-card) !important; }
  .bg-dark-inner     { background-color: var(--c-dark-inner) !important; }
  .bg-card           { background-color: var(--c-card-bg) !important; }
  .bg-phone          { background-color: var(--c-phone-bg) !important; }

  .text-primary      { color: var(--c-primary) !important; }
  .text-secondary    { color: var(--c-secondary) !important; }
  .text-success      { color: var(--c-success) !important; }
  .text-success-dk   { color: var(--c-success-dk) !important; }
  .text-muted        { color: var(--c-muted) !important; }
  .text-subtle       { color: var(--c-subtle) !important; }
  .text-main         { color: var(--c-text) !important; }
  .text-dark-muted   { color: var(--c-dark-text) !important; }

  .border-primary    { border-color: var(--c-primary) !important; }
  .border-main       { border-color: var(--c-border) !important; }
  .border-md         { border-color: var(--c-border-md) !important; }
  .border-dark       { border-color: var(--c-dark-border) !important; }

  .shadow-primary-sm { box-shadow: 0 4px 14px var(--c-primary-glow) !important; }
  .shadow-primary    { box-shadow: 0 6px 20px var(--c-primary-glow) !important; }
  .shadow-primary-lg { box-shadow: 0 8px 24px var(--c-primary-glow) !important; }

  .btn-primary {
    background-color: var(--c-primary);
    color: var(--c-white);
    box-shadow: 0 6px 20px var(--c-primary-glow);
    transition: background-color 0.2s, transform 0.2s;
  }
  .btn-primary:hover {
    background-color: var(--c-primary-hover);
    transform: translateY(-1px);
  }

  .badge-success {
    background-color: var(--c-success-lt);
    color: var(--c-success-dk);
  }

  .chart-line   { stroke: var(--c-secondary); }
  .chart-dot    { fill: var(--c-secondary); stroke: var(--c-secondary); }
  .chart-dot-bg { fill: var(--c-white); }
  .tooltip-bg   { fill: var(--c-secondary); }

  .hero-radial::before {
    content: '';
    position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse 80% 80% at 70% 40%, ${theme.primaryLight}88, transparent);
  }
`;

// ─────────────────────────────────────────────────────────────────
//  Sub-components
// ─────────────────────────────────────────────────────────────────

function PhoneMockupLeft() {
  return (
    <div className="bg-phone rounded-[32px] p-2.5 shadow-[0_24px_60px_rgba(0,0,0,0.22)] w-[190px]">
      <div className="bg-white rounded-[24px] overflow-hidden">
        {/* Status bar */}
        <div className="bg-white px-4 pt-6 pb-2 flex items-center justify-between">
          <span className="text-[9px] font-semibold text-main">9:41</span>
          <div className="w-12 h-3 bg-phone rounded-full" />
          <div className="w-2.5 h-1.5 border border-gray-500 rounded-sm">
            <div className="w-2 h-full bg-gray-500 rounded-sm" />
          </div>
        </div>
        {/* Greeting */}
        <div className="px-4 pb-2">
          <p className="text-[8px] text-muted">Selamat Pagi 👋</p>
          <p className="text-[11px] font-bold text-main">Bunda Sari</p>
        </div>
        {/* Height card */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2.5 bg-secondary-lt rounded-2xl p-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-sky-100 flex items-center justify-center text-lg flex-shrink-0">
              📊
            </div>
            <div>
              <p className="text-[8px] text-muted">Tinggi Badan</p>
              <p className="text-[11px] font-bold text-main">87 cm</p>
              <span className="badge-success text-[7px] font-semibold px-1.5 py-0.5 rounded-full">
                Normal
              </span>
            </div>
          </div>
          <p className="text-[7px] text-subtle italic px-1">
            "Pertumbuhan si Kecil sesuai grafik WHO!"
          </p>
        </div>
        {/* Stats */}
        <div className="px-4 pb-2">
          <p className="text-[8px] font-bold text-main mb-2">Statistik Cepat</p>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              ["12 kg", "Berat"],
              ["Baik", "Status Gizi"],
            ].map(([v, l]) => (
              <div key={l} className="bg-card rounded-xl p-2 text-center">
                <p className="text-[10px] font-black text-main">{v}</p>
                <p className="text-[7px] text-muted">{l}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Menu */}
        <div className="px-4 pb-4 mt-2">
          <div className="bg-primary-light rounded-xl p-2.5">
            <p className="text-[8px] font-bold text-primary">
              🍽️ Menu Hari Ini
            </p>
            <p className="text-[7px] text-muted mt-0.5">
              Bubur Ayam, Sayur, Buah
            </p>
            <span className="badge-success text-[7px] font-semibold px-1.5 py-0.5 rounded-full mt-1 inline-block">
              Tersimpan
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneMockupRight() {
  return (
    <div className="bg-phone rounded-[32px] p-2.5 shadow-[0_24px_60px_rgba(0,0,0,0.22)] w-[180px]">
      <div className="bg-white rounded-[24px] overflow-hidden">
        {/* Status bar */}
        <div className="bg-white px-4 pt-6 pb-2 flex items-center justify-between">
          <span className="text-[9px] font-semibold text-main">9:41</span>
          <div className="w-12 h-3 bg-phone rounded-full" />
        </div>
        <div className="px-3 pb-3">
          {/* Tabs */}
          <div className="flex gap-1.5 mb-3">
            <button className="bg-secondary text-white text-[8px] font-bold px-3 py-1 rounded-full">
              Pertumbuhan
            </button>
            <button className="text-muted text-[8px] font-medium px-2 py-1 rounded-full">
              Gizi
            </button>
            <button className="text-muted text-[8px] font-medium px-2 py-1 rounded-full">
              Aktivitas
            </button>
          </div>
          <p className="text-[8px] font-bold text-main mb-2">
            Grafik Pertumbuhan
          </p>
          {/* Chart */}
          <div className="relative h-16 mb-3">
            <svg viewBox="0 0 160 60" className="w-full h-full">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={theme.secondary}
                    stopOpacity="0.3"
                  />
                  <stop
                    offset="100%"
                    stopColor={theme.secondary}
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>
              {[15, 30, 45].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="160"
                  y2={y}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
              ))}
              <path
                d="M0,50 L25,44 L50,36 L75,28 L100,22 L125,16 L155,10 L155,60 L0,60Z"
                fill="url(#chartGrad)"
              />
              <path
                d="M0,50 L25,44 L50,36 L75,28 L100,22 L125,16 L155,10"
                fill="none"
                className="chart-line"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="155" cy="10" r="3" className="chart-dot" />
              <circle
                cx="155"
                cy="10"
                r="5"
                className="chart-dot-bg chart-dot"
                strokeWidth="2"
              />
              <rect
                x="120"
                y="0"
                width="40"
                height="14"
                rx="4"
                className="tooltip-bg"
              />
              <text
                x="140"
                y="10"
                textAnchor="middle"
                fill="white"
                fontSize="7"
                fontWeight="bold"
              >
                87 cm
              </text>
            </svg>
          </div>
          <div className="flex justify-between text-[7px] text-subtle mb-3 px-0.5">
            {["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
          {/* Recommendation */}
          <div className="bg-secondary-lt rounded-xl p-2.5 mb-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[7px] text-muted">Rekomendasi</p>
                <p className="text-[9px] font-bold text-main">Tambah Protein</p>
              </div>
              <div className="w-7 h-7 bg-primary-light rounded-lg flex items-center justify-center text-sm">
                🥚
              </div>
            </div>
          </div>
          {/* Macros */}
          <div className="flex gap-1.5">
            {[
              ["Protein", "68g", theme.secondary],
              ["Karbo", "145g", theme.primary],
            ].map(([n, v, c]) => (
              <div
                key={n}
                className="flex-1 bg-card rounded-xl p-2 text-center"
              >
                <div className="w-full h-1 rounded-full mb-1.5 bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full w-[65%]"
                    style={{ backgroundColor: c }}
                  />
                </div>
                <p className="text-[9px] font-bold text-main">{v}</p>
                <p className="text-[7px] text-muted">{n}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────
const featuresData = [
  {
    icon: "📈",
    title: "Monitoring Pertumbuhan",
    desc: "Pantau tinggi & berat badan sesuai standar WHO secara berkala dengan grafik interaktif.",
  },
  {
    icon: "🥗",
    title: "Rekomendasi Gizi",
    desc: "Menu harian dipersonalisasi sesuai kebutuhan nutrisi dan usia si Kecil.",
  },
  {
    icon: "🔔",
    title: "Reminder Cerdas",
    desc: "Notifikasi otomatis jadwal makan dan penimbangan agar tidak pernah terlewat.",
  },
  {
    icon: "📋",
    title: "Laporan Berkala",
    desc: "Laporan perkembangan siap dibagikan ke dokter atau bidan untuk konsultasi.",
  },
  {
    icon: "🏥",
    title: "Deteksi Dini Stunting",
    desc: "Sistem peringatan dini berbasis data untuk mencegah risiko stunting sejak awal.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Multi Profil Anak",
    desc: "Kelola profil beberapa anak sekaligus dalam satu akun dengan mudah.",
  },
];
const steps = [
  {
    n: "01",
    title: "Buat Akun Gratis",
    desc: "Daftar dalam 30 detik. Tidak perlu kartu kredit.",
  },
  {
    n: "02",
    title: "Tambah Profil Anak",
    desc: "Isi data dasar seperti nama, tanggal lahir & jenis kelamin.",
  },
  {
    n: "03",
    title: "Catat Pertumbuhan",
    desc: "Input tinggi & berat badan secara rutin setiap bulan.",
  },
  {
    n: "04",
    title: "Pantau & Optimalkan",
    desc: "Lihat grafik & dapatkan rekomendasi gizi personal.",
  },
];
const testimonials = [
  {
    name: "Bunda Rina",
    role: "Ibu 2 anak",
    text: "Sangat membantu! Sekarang saya bisa pantau tumbuh kembang si Kecil dengan mudah dan akurat.",
    avatar: "👩",
  },
  {
    name: "Ayah Budi",
    role: "Ayah 1 anak",
    text: "Fitur rekomendasi gizinya luar biasa. Anak saya lebih suka makan karena menunya variatif.",
    avatar: "👨",
  },
  {
    name: "Bunda Dewi",
    role: "Ibu 3 anak",
    text: "Reminder otomatis bikin saya tidak pernah lupa jadwal makan anak. Sangat direkomendasikan!",
    avatar: "👩",
  },
];
const brandLogos = [
  "Herbalife",
  "MYPROTEIN",
  "SlimFast",
  "Cansaas",
  "Quest",
  "GNC",
];
const footerLinks = [
  { title: "Produk", links: ["Fitur", "Harga", "Download", "Changelog"] },
  { title: "Perusahaan", links: ["Tentang Kami", "Blog", "Karir", "Kontak"] },
  { title: "Legal", links: ["Privasi", "Syarat & Ketentuan", "Cookie"] },
];

// ─── Page ─────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <>
      {/* Inject CSS variables — only place where raw colors live */}
      <style dangerouslySetInnerHTML={{ __html: cssVars }} />

      <div className="bg-white text-main font-sans overflow-x-hidden">
        {/* ── NAVBAR ── */}
        <nav
          className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md"
          style={{ borderBottom: `1px solid var(--c-border)` }}
        >
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-primary-sm bg-primary">
                <span className="text-white text-sm">🐣</span>
              </div>
              <span className="font-black text-lg tracking-tight text-main">
                StuntingCare
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              {["Beranda", "Fitur", "Cara Kerja", "Blog", "Kontak"].map((l) => (
                <Link
                  key={l}
                  href="#"
                  className="text-sm text-muted hover:text-main font-medium transition-colors"
                >
                  {l}
                </Link>
              ))}
            </div>
            <Link
              href="/login"
              className="btn-primary flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full shadow-primary-sm"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" />
              </svg>
              Masuk
            </Link>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="relative min-h-screen bg-hero overflow-hidden pt-16">
          <div className="hero-radial absolute inset-0 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 opacity-30 rounded-full blur-3xl bg-secondary-lt" />

          <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[calc(100vh-64px)] items-center">
            {/* LEFT */}
            <div className="py-16 lg:py-0 flex flex-col justify-center">
              <h1 className="text-5xl sm:text-6xl font-black text-main leading-[1.0] tracking-tight mb-2">
                Sahabat Gizi
              </h1>
              <h1 className="text-5xl sm:text-6xl font-black text-primary leading-[1.0] tracking-tight mb-5">
                Si Kecil Anda
              </h1>
              <p className="text-lg font-light leading-relaxed max-w-[420px] mb-8 text-muted">
                Pantau pertumbuhan, catat asupan gizi, dan cegah stunting sejak
                dini. Perjalanan sehat si Kecil jadi lebih mudah.
              </p>

              <div className="flex flex-wrap gap-3 mb-14">
                <Link
                  href="/register"
                  className="btn-primary flex items-center gap-2.5 text-sm font-bold px-6 py-3.5 rounded-full shadow-primary"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="5" y="2" width="14" height="20" rx="2" />
                    <line x1="12" y1="18" x2="12" y2="18" />
                  </svg>
                  Download App
                </Link>
                <Link
                  href="#features"
                  className="flex items-center gap-2.5 bg-white text-main font-bold text-sm px-6 py-3.5 rounded-full border-md border transition-all hover:bg-gray-50 hover:-translate-y-0.5"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  Pelajari Lebih
                </Link>
              </div>

              {/* Feature icon cards */}
              <div className="flex flex-wrap gap-3">
                {[
                  {
                    icon: "📈",
                    label: "Monitoring\nPertumbuhan",
                    bg: "bg-primary-light",
                  },
                  {
                    icon: "🥗",
                    label: "Catat\nAsupan Gizi",
                    bg: "bg-secondary-lt",
                  },
                  {
                    icon: "💡",
                    label: "Insight\nPersonal",
                    bg: "bg-success-lt",
                  },
                ].map(({ icon, label, bg }) => (
                  <div
                    key={label}
                    className={`${bg} rounded-2xl px-4 py-3.5 flex flex-col items-center text-center w-[105px] hover:-translate-y-1 transition-transform cursor-default`}
                  >
                    <div className="text-3xl mb-2">{icon}</div>
                    <p className="text-[11px] font-bold text-main leading-tight whitespace-pre-line">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — mascot + phones */}
            <div className="relative flex items-end justify-center pb-0 min-h-[520px] lg:min-h-[640px]">
              {/* Rabbit */}
              <div className="absolute bottom-30 left-1/2 -translate-x-1/2 w-[320px] sm:w-[380px] lg:w-[420px] z-10 select-none pointer-events-none">
                <Image
                  src="/images/maskot.png"
                  alt="Maskot Dokter Kelinci StuntingCare"
                  width={420}
                  height={480}
                  className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] scale-200"
                  priority
                />
              </div>

              {/* Phone LEFT */}
              <div className="absolute bottom-[60px] left-0 lg:-left-4 z-20 rotate-[-8deg] hover:rotate-[-4deg] transition-transform duration-500">
                <PhoneMockupLeft />
              </div>

              {/* Phone RIGHT */}
              <div className="absolute bottom-[80px] right-0 lg:-right-4 z-20 rotate-[8deg] hover:rotate-[4deg] transition-transform duration-500">
                <PhoneMockupRight />
              </div>

              {/* Badge top-right */}
              <div
                className="absolute top-12 right-8 z-30 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] px-3.5 py-2.5 flex items-center gap-2.5"
                style={{ border: `1px solid var(--c-border)` }}
              >
                <div className="w-8 h-8 rounded-xl bg-success-lt flex items-center justify-center text-base">
                  ✅
                </div>
                <div>
                  <p className="text-[8px] text-muted">Status Gizi Rafi</p>
                  <p className="text-[11px] font-black text-success">
                    Tumbuh Normal!
                  </p>
                </div>
              </div>

              {/* Badge middle-left */}
              <div
                className="absolute top-1/3 left-0 z-30 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] px-3 py-2.5 flex items-center gap-2"
                style={{ border: `1px solid var(--c-border)` }}
              >
                <div className="w-7 h-7 rounded-lg bg-primary-light flex items-center justify-center text-sm">
                  🔔
                </div>
                <div>
                  <p className="text-[8px] text-muted">Pengingat</p>
                  <p className="text-[10px] font-bold text-main">
                    Makan Siang 12:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trusted strip */}
          <div
            className="relative z-10 bg-white/40 backdrop-blur-sm py-5 px-6"
            style={{ borderTop: `1px solid rgba(229,231,235,0.6)` }}
          >
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-4 sm:gap-10">
              <p className="text-xs text-muted font-medium whitespace-nowrap flex-shrink-0">
                Dipercaya oleh <strong className="text-primary">1.200+</strong>{" "}
                orang tua
              </p>
              <div className="w-px h-4 hidden sm:block flex-shrink-0 bg-gray-200" />
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-8 gap-y-2">
                {brandLogos.map((b) => (
                  <span
                    key={b}
                    className="text-[10px] font-black tracking-widest uppercase"
                    style={{ color: "var(--c-border-md)" }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TAGLINE ── */}
        <section className="py-20 px-6 text-center max-w-3xl mx-auto">
          <p className="text-primary font-bold text-xs uppercase tracking-widest mb-3">
            Kenapa StuntingCare?
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-main leading-tight">
            Nutrisi & pemantauan yang tepat adalah kunci{" "}
            <span className="text-primary">tumbuh kembang optimal.</span>
          </h2>
        </section>

        {/* ── FEATURES ── */}
        <section id="features" className="pb-24 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuresData.map(({ icon, title, desc }, i) => {
              const [bg, iconBg] =
                theme.featureCards[i % theme.featureCards.length];
              return (
                <div
                  key={title}
                  className="rounded-3xl p-6 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 cursor-default"
                  style={{ backgroundColor: bg }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
                    style={{ backgroundColor: iconBg }}
                  >
                    {icon}
                  </div>
                  <h3 className="font-black text-base text-main mb-2">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed font-light text-muted">
                    {desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── DARK APP SECTION ── */}
        <section className="bg-dark py-24 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary font-bold text-xs uppercase tracking-widest mb-4">
                Dashboard Lengkap
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-6">
                Semua data tumbuh kembang ada di genggaman Anda.
              </h2>
              <p className="text-dark-muted font-light leading-relaxed mb-8">
                Visualisasi grafik WHO, status gizi real-time, dan rekomendasi
                menu harian — semuanya dalam satu dashboard yang intuitif.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  ["✓ Grafik pertumbuhan WHO real-time", "text-secondary"],
                  ["✓ Kalori & makro gizi harian anak", "text-primary"],
                  ["✓ Reminder penimbangan & makan rutin", "text-success"],
                ].map(([t, c]) => (
                  <p key={t} className={`text-sm font-semibold ${c}`}>
                    {t}
                  </p>
                ))}
              </div>
            </div>
            {/* Dark phone */}
            <div className="flex justify-center">
              <div className="w-[240px]">
                <div className="rounded-[40px] p-3 shadow-[0_30px_60px_rgba(0,0,0,.5)] bg-dark-card">
                  <div className="rounded-[32px] p-4 space-y-3 bg-dark-inner">
                    <p className="text-white text-xs font-bold">
                      Pertumbuhan Rafi
                    </p>
                    <p className="text-dark-muted text-[9px]">
                      2 tahun 3 bulan
                    </p>
                    <div className="flex items-end gap-1.5 h-16">
                      {[40, 55, 48, 70, 62, 80, 88].map((h, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-t-md ${i === 6 ? "bg-primary" : "bg-gray-700"}`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        ["87cm", "Tinggi"],
                        ["12kg", "Berat"],
                        ["Baik", "Gizi"],
                      ].map(([v, l]) => (
                        <div
                          key={l}
                          className="rounded-xl p-2 text-center bg-dark-card"
                        >
                          <p className="text-white text-[11px] font-bold">
                            {v}
                          </p>
                          <p className="text-dark-muted text-[8px]">{l}</p>
                        </div>
                      ))}
                    </div>
                    <div
                      className="rounded-xl p-2.5"
                      style={{
                        background: `${theme.primary}1a`,
                        border: `1px solid ${theme.primary}33`,
                      }}
                    >
                      <p className="text-primary text-[9px] font-semibold">
                        🥗 Menu hari ini siap
                      </p>
                      <p className="text-dark-muted text-[8px] mt-0.5">
                        Nasi, Sayur Bayam, Ikan Kukus
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-24 px-6 bg-section">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-primary font-bold text-xs uppercase tracking-widest mb-3">
                Cara Kerja
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-main">
                Mulai dalam{" "}
                <span className="text-primary">4 langkah mudah</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map(({ n, title, desc }) => (
                <div key={n} className="text-center">
                  <div className="w-12 h-12 rounded-2xl bg-primary text-white font-black text-lg flex items-center justify-center mx-auto mb-5 shadow-primary">
                    {n}
                  </div>
                  <h3 className="font-bold text-main mb-2 text-sm">{title}</h3>
                  <p className="text-subtle text-xs leading-relaxed font-light">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-primary font-bold text-xs uppercase tracking-widest mb-3">
                Testimoni
              </p>
              <h2 className="text-3xl font-black text-main mb-3">
                Dipercaya ribuan orang tua
              </h2>
              <div className="flex items-center justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary text-lg">
                    ★
                  </span>
                ))}
                <span className="text-sm text-muted ml-2 font-medium">
                  4.9 dari 10.921 ulasan
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map(({ name, role, text, avatar }) => (
                <div
                  key={name}
                  className="bg-card rounded-3xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-primary text-sm">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-muted text-sm leading-relaxed font-light mb-5">
                    "{text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center text-lg">
                      {avatar}
                    </div>
                    <div>
                      <p className="font-bold text-main text-sm">{name}</p>
                      <p className="text-subtle text-xs">{role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 px-6 bg-section text-center">
          <div className="max-w-xl mx-auto">
            <p className="text-primary font-bold text-xs uppercase tracking-widest mb-4">
              Mulai Sekarang
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-main mb-4 leading-tight">
              Investasi terbaik untuk{" "}
              <span className="text-primary">masa depan si Kecil</span>
            </h2>
            <p className="text-muted font-light leading-relaxed mb-8">
              Gratis selamanya. Tidak perlu kartu kredit. Mulai monitoring hari
              ini.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-5">
              <Link
                href="/register"
                className="btn-primary font-bold px-8 py-4 rounded-full shadow-primary-lg"
              >
                Daftar Gratis →
              </Link>
              <Link
                href="/login"
                className="bg-white border-md border text-main font-bold px-8 py-4 rounded-full hover:bg-gray-50 transition-all"
              >
                Sudah punya akun
              </Link>
            </div>
            <p className="text-subtle text-xs">
              ✓ Gratis selamanya &nbsp;·&nbsp; ✓ Berstandar WHO &nbsp;·&nbsp; ✓
              Data aman & terenkripsi
            </p>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="bg-dark text-muted px-6 pt-16 pb-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
              <div className="col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center text-sm">
                    🐣
                  </div>
                  <span className="font-black text-white text-lg">
                    StuntingCare
                  </span>
                </div>
                <p className="text-sm font-light leading-relaxed max-w-[200px] text-dark-muted">
                  Solusi digital untuk cegah stunting dan wujudkan anak
                  Indonesia sehat optimal.
                </p>
              </div>
              {footerLinks.map(({ title, links }) => (
                <div key={title}>
                  <h5 className="text-white font-bold text-sm mb-4">{title}</h5>
                  <div className="flex flex-col gap-2.5">
                    {links.map((l) => (
                      <a
                        key={l}
                        href="#"
                        className="text-xs text-dark-muted hover:text-primary transition-colors"
                      >
                        {l}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div
              className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
              style={{
                borderTop: `1px solid var(--c-dark-border)`,
                color: "var(--c-dark-text)",
              }}
            >
              <span>© 2024 StuntingCare. All rights reserved.</span>
              <div className="flex gap-5">
                {["Privasi", "Syarat", "Kontak"].map((l) => (
                  <a
                    key={l}
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
