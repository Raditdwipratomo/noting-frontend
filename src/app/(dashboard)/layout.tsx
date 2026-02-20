// src/app/(dashboard)/layout.tsx
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AnakProvider } from "@/contexts/AnakContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <AnakProvider>{children}</AnakProvider>
    </ProtectedRoute>
  );
}
