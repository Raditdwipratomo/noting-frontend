"use client";

import { Sparkles } from "lucide-react";
import { aiRecommendations } from "../../lib/data/pertumbuhan-data";

export default function AIRecommendations() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={24} className="text-primary animate-pulse" />
        <h3 className="font-[var(--font-display)] font-bold text-lg text-gray-800">
          Rekomendasi AI
        </h3>
      </div>

      <div className="space-y-4">
        {aiRecommendations.map((rec) => (
          <div
            key={rec.id}
            className={`p-5 rounded-2xl border relative overflow-hidden transition-colors ${
              rec.variant === "primary"
                ? "bg-gradient-to-br from-primary/10 to-teal-50 border-primary/20 group hover:border-primary/50"
                : "bg-white border-gray-200 hover:border-gray-300"
            }`}
          >
            {rec.variant === "primary" && (
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full -mr-10 -mt-10" />
            )}

            <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span
                className={`material-symbols-outlined text-sm ${rec.iconBg} text-white rounded-full p-1`}
              >
                {rec.icon}
              </span>
              {rec.title}
            </h4>

            <p
              className="text-sm text-gray-600 mb-3"
              dangerouslySetInnerHTML={{ __html: rec.description }}
            />

            <button
              className={`text-xs font-bold ${rec.actionColor} flex items-center gap-1`}
            >
              {rec.actionLabel}
              <span className="material-symbols-outlined text-sm">
                {rec.actionIcon}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
