"use client";

import Image from "next/image";
import { CirclePlus } from "lucide-react";
import { childProfiles } from "@/lib/data/dashboard-data";

export default function ChildProfilesList() {
  return (
    <div className="mt-4">
      <h3 className="font-[var(--font-display)] font-bold text-lg text-gray-800 mb-4">
        Profil Anak Lainnya
      </h3>
      <div className="flex gap-4 overflow-x-auto hide-scroll pb-2">
        {/* Add child button */}
        <div className="min-w-[120px] h-[140px] border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary hover:bg-primary/5 cursor-pointer transition-all">
          <CirclePlus size={30} className="mb-1" />
          <span className="text-xs font-bold">Tambah Anak</span>
        </div>

        {/* Child profiles */}
        {childProfiles.map((child) => (
          <div
            key={child.id}
            className={`min-w-[120px] h-[140px] bg-white rounded-2xl p-3 flex flex-col items-center justify-center shadow-sm cursor-pointer relative transition-all ${
              child.isActive
                ? "border-2 border-primary"
                : "border border-gray-200 opacity-70 hover:opacity-100 hover:border-primary/50"
            }`}
          >
            {child.isActive && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full" />
            )}
            <Image
              src={child.photo}
              alt={child.name}
              width={56}
              height={56}
              className="w-14 h-14 rounded-full object-cover mb-2 border-2 border-gray-100"
            />
            <span className="font-bold text-sm text-gray-800">
              {child.name}
            </span>
            <span className="text-[10px] text-gray-500">{child.age}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
