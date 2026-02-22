"use client";

import Image from "next/image";
import { CirclePlus, Baby } from "lucide-react";
import { useAnak } from "@/contexts/AnakContext";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

function getAgeText(tanggalLahir: string): string {
  const birth = new Date(tanggalLahir);
  const now = new Date();
  let months =
    (now.getFullYear() - birth.getFullYear()) * 12 +
    (now.getMonth() - birth.getMonth());
  if (months < 0) months = 0;
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (years > 0) {
    return `${years} Thn ${remainingMonths} Bln`;
  }
  return `${months} Bulan`;
}

export default function ChildProfilesList() {
  const { anakList, selectedAnakId, selectAnak, loading } = useAnak();

  if (loading) {
    return (
      <div className="mt-4">
        <h3 className="font-[var(--font-display)] font-bold text-lg text-gray-800 mb-4">
          Profil Anak
        </h3>
        <div className="flex gap-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="min-w-[120px] h-[140px] bg-gray-100 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h3 className="font-[var(--font-display)] font-bold text-lg text-gray-800 mb-4">
        Profil Anak{anakList.length > 1 ? " Lainnya" : ""}
      </h3>
      <div className="flex gap-4 overflow-x-auto hide-scroll pb-2">
        {/* Add child button */}
        <Link href="/profile-anak/tambah-anak">
          <Card className="min-w-[120px] h-[140px] border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-primary text-gray-400 hover:text-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center p-0 bg-white text-gray-800">
            <CardContent className="p-0 flex flex-col items-center justify-center h-full ">
              <CirclePlus size={30} className="mb-1" />
              <span className="text-xs font-bold">Tambah Anak</span>
            </CardContent>
          </Card>
        </Link>

        {/* Child profiles from API */}
        {anakList.map((child) => {
          const isActive = child.anak_id === selectedAnakId;
          return (
            <Card
              key={child.anak_id}
              onClick={() => selectAnak(child.anak_id)}
              className={cn(
                "min-w-[120px] h-[140px] rounded-2xl flex flex-col items-center justify-center shadow-sm cursor-pointer relative transition-all border p-0",
                isActive
                  ? "border-2 border-primary bg-white"
                  : "border-gray-200 opacity-70 hover:opacity-100 hover:border-primary/50 bg-white"
              )}
            >
              <CardContent className="p-3 flex flex-col items-center justify-center w-full h-full relative">
                {isActive && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full" />
                )}
                {child.foto_profil ? (
                  <Image
                    src={child.foto_profil}
                    alt={child.nama_anak}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-full object-cover mb-2 border-2 border-gray-100"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-2 border-2 border-gray-100">
                    <Baby size={24} className="text-primary" />
                  </div>
                )}
                <span className="font-bold text-sm text-gray-800">
                  {child.nama_anak}
                </span>
                <span className="text-[10px] text-gray-500">
                  {getAgeText(child.tanggal_lahir)}
                </span>
              </CardContent>
            </Card>
          );
        })}

        {/* Empty state */}
        {anakList.length === 0 && !loading && (
          <div className="flex items-center justify-center text-gray-400 text-sm py-8 px-4">
            Belum ada data anak. Tambahkan anak pertama!
          </div>
        )}
      </div>
    </div>
  );
}
