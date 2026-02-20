"use client";

import { TrendingUp } from "lucide-react";
import {
  growthDataPoints,
  trendInsight,
} from "@/lib/data/pertumbuhan-data";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  ReferenceArea
} from "recharts";

const tabs = ["TB/U", "BB/U"] as const;

export default function GrowthChart() {
  const [activeTab, setActiveTab] = useState<string>("TB/U");

  // Transform data to fit an ascending Y-axis (0-100)
  // The original SVG used Y=0 at the top, so we invert it for Recharts
  const chartData = growthDataPoints.map((p) => ({
    name: p.month,
    score: 100 - p.y,
  }));

  // Tooltip formatter
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-100 shadow-sm rounded-lg text-xs z-50 relative">
          <p className="font-bold text-gray-700 mb-1">{label}</p>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <p className="text-amber-600 font-medium">Skor Z: {(payload[0].value / 20 - 3).toFixed(1)}</p>
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
            Analisis Z-Score {activeTab} Berdasarkan Standar WHO
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
        {/* Chart */}
        <div className="relative w-full aspect-[16/7] min-h-[280px] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
          <div className="absolute inset-0 pb-6 w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.6} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#9ca3af', fontWeight: 'bold' }}
                  dy={10}
                />
                <YAxis 
                  domain={[0, 100]} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={false} 
                  width={0}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#facc15', strokeWidth: 1, strokeDasharray: '4 4' }} />
                
                {/* Normal Zone: Score 60 to 100 */}
                <ReferenceArea y1={60} y2={100} fill="#ecfdf5" fillOpacity={0.7} />
                
                {/* Resiko Zone: Score 30 to 60 */}
                <ReferenceArea y1={30} y2={60} fill="#fffbeb" fillOpacity={0.7} />
                
                {/* Stunting Zone: Score 0 to 30 */}
                <ReferenceArea y1={0} y2={30} fill="#fff1f2" fillOpacity={0.7} />

                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "white", stroke: "#F59E0B", strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: "#F59E0B", stroke: "white", strokeWidth: 2 }}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Overlay labels for zones purely for aesthetics to match original exactly */}
          <div className="absolute top-0 right-0 h-[calc(100%-30px)] w-full flex flex-col justify-between pointer-events-none">
             <div className="h-[40%] flex items-center justify-end px-4">
               <span className="text-[10px] font-bold text-emerald-600/60 uppercase tracking-widest hidden sm:inline-block">Normal (+2 ke -1 SD)</span>
             </div>
             <div className="h-[30%] flex items-center justify-end px-4 border-t border-amber-100/50">
               <span className="text-[10px] font-bold text-amber-600/60 uppercase tracking-widest hidden sm:inline-block">Resiko Stunting (-1 ke -2 SD)</span>
             </div>
             <div className="h-[30%] flex items-center justify-end px-4 border-t border-rose-100/50">
               <span className="text-[10px] font-bold text-rose-600/60 uppercase tracking-widest hidden sm:inline-block">Stunting (&lt;-2 SD)</span>
             </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 items-center justify-center sm:justify-start">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="text-xs text-gray-600 font-medium">Normal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="text-xs text-gray-600 font-medium">
              Resiko Stunting
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-400" />
            <span className="text-xs text-gray-600 font-medium">Stunting</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <div className="w-6 h-0.5 bg-amber-500" />
            <span className="text-xs font-bold text-amber-600">
              Pertumbuhan Budi
            </span>
          </div>
        </div>

        {/* Trend insight */}
        <div className="flex items-start gap-4 mt-6 bg-blue-50 p-4 rounded-xl border border-blue-100">
          <TrendingUp size={20} className="text-blue-500 mt-0.5 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-blue-700">
              {trendInsight.title}
            </h4>
            <p className="text-xs text-blue-600 mt-1">
              {trendInsight.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
