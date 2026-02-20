"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Loader2 } from "lucide-react";
import { useAnak } from "@/contexts/AnakContext";
import { pertumbuhanService } from "@/lib/api/services/pertumbuhan.service";
import type { GrowthChartData } from "@/lib/types/pertumbuhan.types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const tabs = ["TB/U", "BB/U"] as const;

export default function GrowthChart() {
  const { selectedAnak, selectedAnakId } = useAnak();
  const [chartData, setChartData] = useState<GrowthChartData | null>(null);
  const [activeTab, setActiveTab] = useState<string>("TB/U");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedAnakId) return;
    let cancelled = false;

    const fetch = async () => {
      setLoading(true);
      try {
        const data = await pertumbuhanService.getGrowthChart(selectedAnakId);
        if (!cancelled) setChartData(data);
      } catch {
        if (!cancelled) setChartData(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetch();
    return () => {
      cancelled = true;
    };
  }, [selectedAnakId]);

  if (loading) {
    return (
      <Card className="rounded-3xl shadow-sm border-gray-100 overflow-hidden bg-white">
        <CardContent className="p-10 flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-gray-400" />
        </CardContent>
      </Card>
    );
  }

  if (!chartData || chartData.labels.length === 0) {
    return (
      <Card className="rounded-3xl shadow-sm border-gray-100 overflow-hidden bg-white text-gray-800">
        <CardContent className="p-10 flex flex-col items-center justify-center text-gray-400 gap-3">
          <TrendingUp size={48} />
          <span className="text-sm">Belum ada data pertumbuhan untuk ditampilkan</span>
        </CardContent>
      </Card>
    );
  }

  // Build recharts data from API response
  const isTBMode = activeTab === "TB/U";
  const datasetValues = isTBMode
    ? chartData.datasets.tinggi_badan
    : chartData.datasets.berat_badan;

  const rechartsData = chartData.labels.map((label, idx) => ({
    name: label,
    value: datasetValues[idx] ?? 0,
  }));

  const yUnit = isTBMode ? "cm" : "kg";
  const childName = chartData.metadata?.nama_anak ?? selectedAnak?.nama_anak ?? "Anak";

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-100 shadow-sm rounded-lg text-xs z-50 relative">
          <p className="font-bold text-gray-700 mb-1">{label}</p>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <p className="text-primary font-medium">
              {payload[0].value} {yUnit}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="rounded-3xl shadow-sm border-gray-100 overflow-hidden bg-white text-gray-800">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 space-y-0 pb-2">
        <div>
          <CardTitle className="font-[var(--font-display)] font-bold text-xl text-gray-800">
            Tren Pertumbuhan
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            {isTBMode ? "Tinggi Badan" : "Berat Badan"} per Pengukuran —{" "}
            {childName}
          </CardDescription>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "h-8 px-3 text-xs font-bold rounded-md transition-all shadow-none hover:bg-white/50",
                activeTab === tab
                  ? "bg-white text-primary shadow-sm hover:bg-white"
                  : "text-gray-500 hover:text-gray-700 bg-transparent"
              )}
            >
              {tab}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-4">
        <div className="relative w-full aspect-[16/7] min-h-[280px] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
          <div className="absolute inset-0 pb-6 w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={rechartsData}
                margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb"
                  opacity={0.6}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fill: "#9ca3af",
                    fontWeight: "bold",
                  }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                  width={40}
                  unit={` ${yUnit}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{
                    r: 4,
                    fill: "white",
                    stroke: "hsl(var(--primary))",
                    strokeWidth: 2,
                  }}
                  activeDot={{
                    r: 6,
                    fill: "hsl(var(--primary))",
                    stroke: "white",
                    strokeWidth: 2,
                  }}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 items-center justify-center sm:justify-start">
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-primary" />
            <span className="text-xs font-bold text-primary">
              Pertumbuhan {childName}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
