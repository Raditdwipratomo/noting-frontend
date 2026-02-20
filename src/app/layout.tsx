// src/app/layout.tsx
import { Nunito_Sans, Fredoka } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  title: "NutriStunting - Monitor Pertumbuhan Anak",
  description: "Monitoring tumbuh kembang anak untuk mencegah stunting",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${nunitoSans.variable} ${fredoka.variable}`}>
      <head>
        {/* Material Symbols for AI recommendation icons */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={nunitoSans.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
