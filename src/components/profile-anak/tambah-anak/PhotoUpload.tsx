import { useState } from "react";
import { Camera } from "lucide-react";

interface PhotoUploadProps {
  onPhotoSelected?: (file: File | null) => void;
}

export default function PhotoUpload({ onPhotoSelected }: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran gambar maksimal 2MB");
        return;
      }
      
      onPhotoSelected?.(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center pt-2">
      <label className="group relative flex flex-col items-center justify-center w-full aspect-square max-w-[220px] rounded-full border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-primary/5 hover:border-primary transition-all cursor-pointer overflow-hidden">
        {preview ? (
          <img src={preview} alt="Profile Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-400 group-hover:text-primary transition-colors">
             <div className="bg-white p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
               <Camera className="size-8" />
             </div>
             <p className="mb-1 text-sm font-semibold">Upload Foto</p>
             <p className="text-xs text-slate-400">PNG, JPG (Max 2MB)</p>
          </div>
        )}
        <input className="hidden" type="file" accept="image/png, image/jpeg" onChange={handleFileChange} />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </label>
      <p className="text-xs text-slate-400 text-center mt-6 px-4 leading-relaxed">
        Foto profil membantu membedakan profil jika Anda memantau lebih dari satu anak.
      </p>
    </div>
  );
}
