"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, CircleDashed, Trophy } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";

export default function WeeklySummary() {
  const percentage = 49;
  const data = [{ name: "Progress", value: percentage, fill: "var(--primary)" }];

  return (
    <Card className="rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center sticky top-28">
      <CardContent className="p-8 w-full bg-white text-gray-800">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Ringkasan Mingguan</h3>
        <div className="relative flex items-center justify-center mb-6 h-48 w-48 mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="85%"
              outerRadius="100%"
              barSize={12}
              data={data}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                background={{ fill: "#f1f5f9" }}
                dataKey="value"
                cornerRadius={10}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-4xl font-black text-slate-900">{percentage}%</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
              Selesai
            </span>
          </div>
        </div>
        <div className="w-full space-y-4">
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 flex justify-between items-center">
            <div className="text-left">
              <span className="block text-[10px] font-bold text-emerald-700 uppercase">
                Tercapai
              </span>
              <span className="text-xl font-bold text-emerald-800">24</span>
              <span className="text-xs text-emerald-600 font-medium ml-1">Menu</span>
            </div>
            <CheckCircle2 className="text-emerald-500 w-8 h-8" />
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex justify-between items-center">
            <div className="text-left">
              <span className="block text-[10px] font-bold text-slate-600 uppercase">
                Sisa Target
              </span>
              <span className="text-xl font-bold text-slate-800">25</span>
              <span className="text-xs text-slate-500 font-medium ml-1">Menu</span>
            </div>
            <CircleDashed className="text-slate-400 w-8 h-8" />
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-50 w-full text-left">
          <h4 className="font-bold text-slate-800 text-sm mb-3">
            Statistik Nutrisi Minggu Ini
          </h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-[10px] font-bold mb-1">
                <span className="text-slate-500">Kebutuhan Energi</span>
                <span className="text-slate-900">7.350 / 10.850 kkal</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: "67%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-bold mb-1">
                <span className="text-slate-500">Target Protein</span>
                <span className="text-slate-900">175g / 245g</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full"
                  style={{ width: "71%" }}
                ></div>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-teal-50 rounded-xl border border-teal-100 flex gap-3 items-start">
            <Trophy className="text-teal-600 w-6 h-6 shrink-0" />
            <p className="text-xs text-teal-800 leading-relaxed font-medium">
              Minggu yang luar biasa! Kamu sudah menyelesaikan hampir 50% rencana
              gizi. Terus konsisten untuk cegah stunting!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
