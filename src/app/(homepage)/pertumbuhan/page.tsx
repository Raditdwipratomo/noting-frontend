"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DiagnosisCard from "@/components/pertumbuhan/DiagnosisCard";
import GrowthChart from "@/components/pertumbuhan/GrowthChart";
import AIRecommendations from "@/components/pertumbuhan/AIRecommendations";
import DiagnosisHistory from "@/components/pertumbuhan/DiagnosisHistory";

export default function PertumbuhanPage() {
  return (
   
      <div className="w-full max-w-screen bg-white min-h-screen overflow-hidden border border-gray-200 flex flex-col">
        {/* Header */}
        <DashboardHeader activePage="/pertumbuhan" />

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row flex-1 bg-gray-50 overflow-hidden">
          {/* Left: Main content */}
          <div className="w-full lg:w-[65%] p-6 overflow-y-auto h-full lg:h-[calc(100vh-140px)] ">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <span className="cursor-pointer hover:text-primary flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
                Beranda
              </span>
              <span className="text-xs">›</span>
              <span className="font-semibold text-gray-800">
                Diagnosa & Tren
              </span>
            </div>

            {/* Diagnosis Card */}
            <DiagnosisCard />

            {/* Growth Chart */}
            <GrowthChart />
          </div>

          {/* Right: Sidebar */}
          <div className="w-full lg:w-[35%] bg-white border-l border-gray-200 p-6 flex flex-col h-full overflow-y-auto">
            {/* AI Recommendations */}
            <AIRecommendations />

            {/* Diagnosis History + Input Button */}
            <DiagnosisHistory />
          </div>
        </div>
      </div>
 
  );
}
