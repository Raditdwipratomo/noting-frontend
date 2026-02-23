"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import InputDataForm from "@/components/pertumbuhan/input-data/InputDataForm";
import InputDataSidebar from "@/components/pertumbuhan/input-data/InputDataSidebar";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function InputDataPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="w-full max-w-screen bg-white shadow-2xl overflow-hidden border border-gray-200 min-h-screen flex flex-col">
      <DashboardHeader activePage="/pertumbuhan/input-data" />

      <div className="flex flex-col lg:flex-row flex-1 bg-gray-50 overflow-hidden pt-20">
        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-y-auto h-full lg:h-[calc(100vh-140px)] hide-scroll">
          

          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="font-[var(--font-display)] font-bold text-3xl text-gray-800 mb-2">
                Input Data Pertumbuhan
              </h1>
              <p className="text-gray-500">
                Masukkan data pengukuran terbaru untuk memantau status gizi anak.
              </p>
            </div>

            <InputDataForm onSuccess={handleSuccess} />
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="w-full lg:w-[320px] bg-white border-l border-gray-200 p-6 flex flex-col h-full overflow-y-auto hide-scroll">
          <InputDataSidebar refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  );
}
