"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DiagnosisCard from "@/components/pertumbuhan/DiagnosisCard";
import GrowthChart from "@/components/pertumbuhan/GrowthChart";
import AIRecommendations from "@/components/pertumbuhan/AIRecommendations";
import DiagnosisHistory from "@/components/pertumbuhan/DiagnosisHistory";

export default function PertumbuhanPage() {
  return (

      <div className="w-full max-w-screen bg-white shadow-2xl overflow-hidden border border-gray-200 min-h-screen flex flex-col">
        {/* Header */}
        <DashboardHeader activePage="/pertumbuhan" />

        {/* Main Content Area */}
        <div className="flex flex-col pt-20 lg:flex-row flex-1 bg-gray-50 overflow-hidden">
          {/* Left: Main content */}
          <div className="w-full lg:w-[65%] h-[90vh] p-6 overflow-y-auto hide-scroll">
            {/* Breadcrumb */}
           

            {/* Diagnosis Card */}
            <DiagnosisCard />

            {/* Growth Chart */}
            <GrowthChart />
          </div>

          {/* Right: Sidebar */}
          <div className="w-full lg:w-[35%] bg-white border-l border-gray-200 p-6 flex flex-col h-[90vh] overflow-y-auto">

            {/* AI Recommendations */}
            <AIRecommendations />

            {/* Diagnosis History + Input Button */}
            <DiagnosisHistory />
          </div>
        </div>
      </div>

  );
}
