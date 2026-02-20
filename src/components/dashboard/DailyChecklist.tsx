"use client";

import {
  Check,
  Pencil,
  Sunrise,
  Sun,
  Moon,
  PlusCircle,
  Megaphone,
  ArrowUp,
} from "lucide-react";
import {
  checklistItems,
  calorieProgress,
  posyanduReminder,
} from "@/lib/data/dashboard-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";

const timeIcons: Record<string, React.ElementType> = {
  pagi: Sunrise,
  siang: Sun,
  malam: Moon,
};

const timeIconColors: Record<string, string> = {
  pagi: "text-orange-400",
  siang: "text-yellow-500",
  malam: "text-blue-400",
};

const timeLabels: Record<string, string> = {
  pagi: "Pagi",
  siang: "Siang",
  malam: "Malam",
};

function CalorieRing() {
  const percentage = calorieProgress.percentage;
  const data = [{ name: "Calorie", value: percentage, fill: "var(--secondary)" }];

  return (
    <Card className="bg-gradient-to-br  from-gray-900 to-gray-800 rounded-3xl text-white mb-8 relative overflow-hidden shadow-lg border-none">
      <CardContent className="p-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary rounded-full blur-3xl opacity-20 transform translate-x-10 -translate-y-10" />
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="80%"
                outerRadius="100%"
                barSize={8}
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
                  background={{ fill: "#374151" }} // gray-700
                  dataKey="value"
                  cornerRadius={10}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold">
                {percentage}%
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-300 mb-1">Kebutuhan Kalori</p>
            <p className="font-bold text-lg leading-tight mb-2">
              {calorieProgress.message}
            </p>
            <p className="text-xs text-gray-400">
              Sisa {calorieProgress.remaining} kkal lagi untuk hari ini.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ChecklistItemCard({
  item,
}: {
  item: (typeof checklistItems)[number];
}) {
  const TimeIcon = timeIcons[item.timeOfDay];

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <TimeIcon size={14} className={timeIconColors[item.timeOfDay]} />
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          {timeLabels[item.timeOfDay]}
        </span>
      </div>

      <Card
        className={cn(
          "rounded-xl border shadow-sm transition-colors",
          item.isCompleted ? "bg-gray-50 border-gray-100 hover:border-primary/30" : "bg-white border-gray-200 hover:border-primary"
        )}
      >
        <CardContent className="p-4 flex gap-3 group items-start">
          {/* Custom Checkbox/Button Logic */}
          {item.isCompleted ? (
             <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0 mt-0.5">
                <Check size={14} />
             </div>
          ) : (
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center shrink-0 mt-0.5 cursor-pointer hover:border-primary hover:bg-primary/10 transition-colors" />
          )}

          <div className="flex-1">
            <h5
              className={cn(
                "text-sm font-bold text-gray-800",
                item.isCompleted && "line-through decoration-gray-400"
              )}
            >
              {item.title}
            </h5>
            <p className="text-xs text-gray-500">{item.timeDetail}</p>
            {!item.isCompleted && item.tags && (
              <div className="mt-2 flex gap-2">
                {item.tags.map((tag) => (
                  <Badge
                    key={tag.label}
                    variant="outline"
                    className="px-2 py-0.5 bg-red-100 text-red-600 border-transparent text-[10px] rounded font-bold hover:bg-red-200"
                  >
                    {tag.label}
                  </Badge>
                ))}
              </div>
            )}
          </div>

           {item.isCompleted ? (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-primary">
                  <Pencil size={14} />
                </Button>
              </div>
           ) : (
              <Button size="icon" className="h-8 w-8 rounded-full bg-primary hover:bg-teal-600 shadow-md">
                <Check size={14} />
              </Button>
           )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function DailyChecklist() {
  return (
    <div className="w-full lg:w-[35%] bg-white border-l border-gray-200 p-6 flex flex-col h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-[var(--font-display)] font-bold text-lg text-gray-800">
          Ceklis Harian
        </h3>
        <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
          Hari Ini
        </Badge>
      </div>

      {/* Calorie Progress */}
      <CalorieRing />

      {/* Checklist Items */}
      <div className="space-y-6">
        {checklistItems.map((item) => (
          <ChecklistItemCard key={item.id} item={item} />
        ))}

        {/* Malam placeholder */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Moon size={14} className="text-blue-400" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Malam
            </span>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 border-dashed flex gap-3 items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors text-gray-400 hover:text-primary">
            <PlusCircle size={20} />
            <span className="text-sm font-medium">Catat Makan Malam</span>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-auto pt-6">
        {/* Posyandu Reminder */}
        <Card className="bg-yellow-50 border-yellow-100 shadow-none">
          <CardContent className="p-4 flex gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center shrink-0 text-yellow-600">
              <Megaphone size={20} />
            </div>
            <div>
              <h5 className="font-bold text-sm text-gray-800">
                {posyanduReminder.title}
              </h5>
              <p className="text-xs text-gray-600 mt-1">
                {posyanduReminder.description}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Note Input */}
        <div className="mt-4 relative">
          <Input
            type="text"
            className="w-full bg-gray-100 border-none rounded-xl py-6 pl-4 pr-10 text-sm focus-visible:ring-primary placeholder-gray-400"
            placeholder="Tambah catatan hari ini..."
          />
          <Button
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-800 hover:bg-primary"
          >
            <ArrowUp size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}
