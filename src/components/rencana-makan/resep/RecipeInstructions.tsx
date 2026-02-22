"use client";

import { ChefHat as Skillet } from "lucide-react";

interface RecipeInstructionsProps {
  langkahPembuatan?: string[];
}

export default function RecipeInstructions({ langkahPembuatan }: RecipeInstructionsProps) {
  if (!langkahPembuatan || langkahPembuatan.length === 0) return null;

  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-2">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-xl text-primary">
          <Skillet />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Langkah Memasak</h2>
      </div>

      <div className="space-y-6">
        {langkahPembuatan.map((langkah, idx) => (
          <div key={idx}>
            <div className="flex gap-4 mb-6">
              <div className="flex-shrink-0 size-8 rounded-full bg-primary/30 text-slate-900 font-bold flex items-center justify-center">
                {idx + 1}
              </div>
              <div className="pt-1">
                <p className="text-slate-800 leading-relaxed font-medium">
                  {langkah}
                </p>
              </div>
            </div>
            {idx < langkahPembuatan.length - 1 && (
              <div className="w-full h-px bg-[#e7f3f0] mb-6"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
