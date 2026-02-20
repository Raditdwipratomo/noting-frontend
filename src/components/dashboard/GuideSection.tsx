"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Clock, Flame, Baby } from "lucide-react";
import { guideCards } from "@/lib/data/dashboard-data";

const iconMap: Record<string, React.ElementType> = {
  clock: Clock,
  flame: Flame,
  baby: Baby,
};

const categoryColors: Record<string, string> = {
  orange: "text-orange-500",
  purple: "text-purple-500",
};

export default function GuideSection() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-[var(--font-display)] font-bold text-lg text-gray-800">
          Panduan Stimulasi &amp; Gizi
        </h3>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-500">
            <ChevronLeft size={18} />
          </button>
          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-500">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
        {guideCards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <Image
              src={card.image}
              alt={card.title}
              width={96}
              height={96}
              className="w-24 h-24 rounded-xl object-cover shrink-0"
            />
            <div>
              <span
                className={`text-xs font-bold ${categoryColors[card.categoryColor]} uppercase tracking-wide`}
              >
                {card.category}
              </span>
              <h4 className="font-[var(--font-display)] font-bold text-gray-800 mt-1 mb-2">
                {card.title}
              </h4>
              <p className="text-xs text-gray-500 line-clamp-2">
                {card.description}
              </p>
              <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                {card.meta.map((m) => {
                  const Icon = iconMap[m.icon];
                  return (
                    <span key={m.text} className="flex items-center gap-1">
                      {Icon && <Icon size={14} />}
                      {m.text}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
