"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProfileHeader from "@/components/profile/ProfileHeader";
import GrowthStats from "@/components/profile/GrowthStats";
import AllergyList from "@/components/profile/AllergyList";
import ImmunizationHistory from "@/components/profile/ImmunizationHistory";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { ChevronRight } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="w-full min-h-screen bg-white shadow-2xl overflow-hidden border border-slate-200 flex flex-col">
      <DashboardHeader activePage="/profile-anak" />

      <div className="flex flex-col pt-20 lg:flex-row flex-1 bg-slate-50 overflow-hidden">
        {/* Left Content Area */}
        <div className="flex-1 lg:w-[65%] p-6 overflow-y-auto h-full lg:h-[calc(100vh-80px)] hide-scroll">
          

          <ProfileHeader />
          <GrowthStats />
          <AllergyList />
          <ImmunizationHistory />
        </div>

        {/* Right Sidebar */}
        <ProfileSidebar />
      </div>
    </div>
  );
}
