"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ChildProfileCard from "@/components/dashboard/ChildProfileCard";
import GuideSection from "@/components/dashboard/GuideSection";
import ChildProfilesList from "@/components/dashboard/ChildProfileList";
import DailyChecklist from "@/components/dashboard/DailyChecklist";

export default function DashboardPage() {
  return (
    // <div className="bg-bg-light font-[var(--font-body)] text-text-main min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8">

    // </div>
    <div className="w-full max-w-screen bg-white shadow-2xl overflow-hidden border border-gray-200  flex flex-col">
      {/* Header */}
      <DashboardHeader />

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row flex-1 bg-gray-50 overflow-hidden">
        {/* Left: Main content */}
        <div className="flex-1 p-6 overflow-y-auto h-full lg:h-[calc(100vh-140px)] hide-scroll">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <span className="cursor-pointer hover:text-primary">Dasbor</span>
            <span className="text-xs">›</span>
            <span className="font-semibold text-gray-800">
              Monitor Pertumbuhan
            </span>
          </div>

          {/* Child Profile Card */}
          <ChildProfileCard />

          {/* Guide Section */}
          <GuideSection />

          {/* Child Profiles List */}
          <ChildProfilesList />
        </div>

        {/* Right: Daily Checklist Sidebar */}
        <DailyChecklist />
      </div>
    </div>
  );
}
