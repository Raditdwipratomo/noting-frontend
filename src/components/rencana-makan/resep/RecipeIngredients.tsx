"use client";

import { ShoppingCart as GroceryStore, Bot as SmartToy } from "lucide-react";

interface RecipeIngredientsProps {
  bahanBahan?: string[];
}

export default function RecipeIngredients({ bahanBahan }: RecipeIngredientsProps) {
  if (!bahanBahan || bahanBahan.length === 0) return null;

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#e7f3f0] h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-xl text-primary">
          <GroceryStore />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Bahan-bahan</h2>
      </div>

      <ul className="space-y-4 mb-6 flex-grow">
        {bahanBahan.map((bahan, idx) => (
          <li key={idx} className="flex items-start gap-3 group cursor-pointer">
            <div className="relative flex items-center pt-1">
              <input
                type="checkbox"
                className="peer appearance-none size-5 border-2 border-slate-300 rounded-md checked:bg-primary checked:border-primary transition-all cursor-pointer"
              />
              <svg 
                className="absolute w-4 h-4 text-white left-[2px] top-[6px] opacity-0 peer-checked:opacity-100 pointer-events-none" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span className="text-slate-800 font-medium group-hover:text-primary transition-colors select-none">
              {bahan}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6 border-t border-[#e7f3f0]">
        <button className="w-full group flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 rounded-xl text-primary font-semibold transition-all duration-300 border border-primary/20 hover:border-primary/40 hover:shadow-sm">
          <SmartToy className="group-hover:animate-pulse text-primary" fontSize="small" />
          <span>Bahan tidak tersedia? Regenerasi dengan AI</span>
        </button>
      </div>
    </div>
  );
}
