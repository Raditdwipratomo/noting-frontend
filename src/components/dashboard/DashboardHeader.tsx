"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  TrendingUp,
  UtensilsCrossed,
  Bell,
  Baby,
  ShieldAlert,
} from "lucide-react";
import { userProfile } from "@/lib/data/dashboard-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Beranda", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Pertumbuhan", icon: TrendingUp, href: "/pertumbuhan" },
  { label: "Rencana Makan", icon: UtensilsCrossed, href: "/rencana-makan" },
  { label: "Profile Anak", icon: Baby, href: "/profile" },
  { label: "Alergi", icon: ShieldAlert, href: "/alergi" },
];

interface DashboardHeaderProps {
  activePage?: string;
}

export default function DashboardHeader({
  activePage = "/dashboard",
}: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-gradient-to-tr from-primary to-emerald-400 rounded-xl flex items-center justify-center text-white font-[var(--font-display)] font-bold text-xl shadow-lg shadow-primary/30">
          N
        </div>
        <span className="font-[var(--font-display)] font-bold text-xl tracking-tight text-gray-800 hidden sm:block">
          NutriStunting
        </span>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-1 bg-gray-50 p-1.5 rounded-full border border-gray-100">
        {navItems.map((item) => {
          const isActive = item.href === activePage;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "px-6 py-2 rounded-full text-sm flex items-center gap-2 transition-all",
                isActive
                  ? "bg-white shadow-sm text-primary font-bold border border-gray-100 hover:scale-105"
                  : "text-gray-500 hover:text-primary font-medium"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 relative"
        >
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border-2 border-white" />
        </Button>
        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
          <AvatarImage src={userProfile.photo} alt="Foto Profil Bunda" className="object-cover" />
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
