"use client";

import Image from "next/image";
import { CirclePlus } from "lucide-react";
import { childProfiles } from "@/lib/data/dashboard-data";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ChildProfilesList() {
  return (
    <div className="mt-4">
      <h3 className="font-[var(--font-display)] font-bold text-lg text-gray-800 mb-4">
        Profil Anak Lainnya
      </h3>
      <div className="flex gap-4 overflow-x-auto hide-scroll pb-2">
        {/* Add child button */}
        <Card className="min-w-[120px] h-[140px] border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-primary text-gray-400 hover:text-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center p-0 bg-white text-gray-800">
          <CardContent className="p-0 flex flex-col items-center justify-center h-full ">
            <CirclePlus size={30} className="mb-1" />
            <span className="text-xs font-bold">Tambah Anak</span>
          </CardContent>
        </Card>

        {/* Child profiles */}
        {childProfiles.map((child) => (
          <Card
            key={child.id}
            className={cn(
              "min-w-[120px] h-[140px] rounded-2xl flex flex-col items-center justify-center shadow-sm cursor-pointer relative transition-all border p-0",
              child.isActive
                ? "border-2 border-primary bg-white"
                : "border-gray-200 opacity-70 hover:opacity-100 hover:border-primary/50 bg-white"
            )}
          >
            <CardContent className="p-3 flex flex-col items-center justify-center w-full h-full relative">
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
