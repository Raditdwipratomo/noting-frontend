// src/contexts/AnakContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import { anakService } from "@/lib/api/services/anak.service";
import type { GetAnakResponse } from "@/lib/types/anak.types";

// ============================================
// CONTEXT TYPES
// ============================================

interface AnakContextType {
  /** All children belonging to the authenticated user */
  anakList: GetAnakResponse[];
  /** Currently selected child */
  selectedAnak: GetAnakResponse | null;
  /** ID of the currently selected child */
  selectedAnakId: number | null;
  /** Whether the children list is loading */
  loading: boolean;
  /** Error message if fetching failed */
  error: string | null;
  /** Select a different child by ID */
  selectAnak: (anakId: number) => void;
  /** Refresh the children list from the API */
  refreshAnakList: () => Promise<void>;
}

const AnakContext = createContext<AnakContextType | undefined>(undefined);

// ============================================
// ANAK PROVIDER COMPONENT
// ============================================

interface AnakProviderProps {
  children: ReactNode;
}

export function AnakProvider({ children }: AnakProviderProps) {
  const { isAuthenticated } = useAuth();

  const [anakList, setAnakList] = useState<GetAnakResponse[]>([]);
  const [selectedAnakId, setSelectedAnakId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ============================================
  // FETCH CHILDREN LIST
  // ============================================

  const fetchAnakList = useCallback(async () => {
    if (!isAuthenticated) {
      setAnakList([]);
      setSelectedAnakId(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await anakService.getAllAnak();
      setAnakList(data);

      // Auto-select first child if none selected
      if (data.length > 0 && !selectedAnakId) {
        setSelectedAnakId(data[0].anak_id);
      }
      // Clear selection if selected child no longer exists
      if (selectedAnakId && !data.find((a) => a.anak_id === selectedAnakId)) {
        setSelectedAnakId(data.length > 0 ? data[0].anak_id : null);
      }
    } catch (err: any) {
      console.error("Failed to fetch anak list:", err);
      setError(err.message || "Gagal memuat data anak");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, selectedAnakId]);

  useEffect(() => {
    fetchAnakList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // ============================================
  // SELECT CHILD
  // ============================================

  const selectAnak = useCallback(
    (anakId: number) => {
      const exists = anakList.find((a) => a.anak_id === anakId);
      if (exists) {
        setSelectedAnakId(anakId);
      } else {
        console.warn(`Anak with ID ${anakId} not found in list`);
      }
    },
    [anakList],
  );

  // ============================================
  // DERIVED STATE
  // ============================================

  const selectedAnak =
    anakList.find((a) => a.anak_id === selectedAnakId) ?? null;

  // ============================================
  // CONTEXT VALUE
  // ============================================

  const value: AnakContextType = {
    anakList,
    selectedAnak,
    selectedAnakId,
    loading,
    error,
    selectAnak,
    refreshAnakList: fetchAnakList,
  };

  return <AnakContext.Provider value={value}>{children}</AnakContext.Provider>;
}

// ============================================
// CUSTOM HOOK
// ============================================

export function useAnak() {
  const context = useContext(AnakContext);

  if (context === undefined) {
    throw new Error("useAnak must be used within an AnakProvider");
  }

  return context;
}
