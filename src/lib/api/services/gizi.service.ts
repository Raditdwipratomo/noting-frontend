import apiClient from "../client";
import type { ApiResponse } from "@/lib/types";
import {
  RencanaGiziResponse,
  RencanaGiziDetailResponse,
  RencanaGiziHistoryResponse,
  RekomendasiHarian,
  GiziProgressResponse,
  UpdateMakananStatusRequest,
  UpdateMakananStatusResponse,
} from "@/lib/types/gizi.types";
import { apiRoutes } from "@/lib/types/constants";
import axios from "axios";

// ----------------------------------------------------------------
// Error Class
// ----------------------------------------------------------------

class GiziServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown,
  ) {
    super(message);
    this.name = "GiziServiceError";
  }
}

// ----------------------------------------------------------------
// Centralised Error Handler
// ----------------------------------------------------------------

function handleServiceError(error: unknown, context: string): never {
  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;
    const serverMessage = error.response?.data?.message;

    if (statusCode === 400) {
      throw new GiziServiceError(
        serverMessage ??
          "Permintaan tidak valid. Pastikan data pertumbuhan sudah diinput",
        statusCode,
        error,
      );
    }
    if (statusCode === 401) {
      throw new GiziServiceError(
        "Sesi telah berakhir, silakan login ulang",
        statusCode,
        error,
      );
    }
    if (statusCode === 403) {
      throw new GiziServiceError(
        "Anda tidak memiliki akses ke data anak ini",
        statusCode,
        error,
      );
    }
    if (statusCode === 404) {
      throw new GiziServiceError(
        `Data tidak ditemukan: ${context}`,
        statusCode,
        error,
      );
    }
    if (statusCode === 422) {
      throw new GiziServiceError(
        "AI menghasilkan respons yang tidak valid. Silakan coba lagi",
        statusCode,
        error,
      );
    }
    if (statusCode === 429) {
      throw new GiziServiceError(
        "Terlalu banyak permintaan ke AI. Silakan tunggu beberapa saat",
        statusCode,
        error,
      );
    }
    if (statusCode && statusCode >= 500) {
      throw new GiziServiceError(
        "Layanan AI tidak tersedia. Silakan hubungi administrator",
        statusCode,
        error,
      );
    }

    throw new GiziServiceError(
      serverMessage ?? `Terjadi kesalahan: ${context}`,
      statusCode,
      error,
    );
  }

  throw new GiziServiceError(
    `Unexpected error on: ${context}`,
    undefined,
    error,
  );
}

// ----------------------------------------------------------------
// Service
// ----------------------------------------------------------------

class GiziService {
  /**
   * POST /api/anak/:anakId/gizi/rencana/generate
   * Generate new AI weekly nutrition plan
   */
  async generateRencana(anakId: number): Promise<RencanaGiziResponse> {
    if (!anakId || anakId <= 0) {
      throw new GiziServiceError("ID anak tidak valid");
    }

    try {
      const response = await apiClient.post<ApiResponse<RencanaGiziResponse>>(
        apiRoutes.API.ANAK.GIZI.RENCANA.GENERATE(anakId),
      );

      if (!response.data?.data) {
        throw new GiziServiceError(
          "Gagal membuat rencana gizi, coba lagi nanti",
        );
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof GiziServiceError) throw error;
      handleServiceError(error, `generateRencana(anakId: ${anakId})`);
    }
  }

  /**
   * GET /api/anak/:anakId/gizi/rencana
   * Get current/active weekly nutrition plan
   * Returns null when no active plan exists (valid state)
   */
  async getCurrentRencana(
    anakId: number,
  ): Promise<RencanaGiziDetailResponse | null> {
    if (!anakId || anakId <= 0) {
      throw new GiziServiceError("ID anak tidak valid");
    }

    try {
      const response = await apiClient.get<
        ApiResponse<RencanaGiziDetailResponse | null>
      >(apiRoutes.API.ANAK.GIZI.RENCANA.CURRENT(anakId));

      // null is valid — no active plan yet
      if (response.data?.data === undefined) {
        throw new GiziServiceError(
          "Response data rencana gizi tidak ditemukan",
        );
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof GiziServiceError) throw error;
      handleServiceError(error, `getCurrentRencana(anakId: ${anakId})`);
    }
  }

  /**
   * GET /api/anak/:anakId/gizi/rencana/history?limit=:limit&offset=:offset
   * Get all weekly plans history with pagination
   */
  async getRencanaHistory(
    anakId: number,
    limit = 10,
    offset = 0,
  ): Promise<RencanaGiziHistoryResponse> {
    if (!anakId || anakId <= 0) {
      throw new GiziServiceError("ID anak tidak valid");
    }
    if (limit <= 0 || limit > 100) {
      throw new GiziServiceError("Limit harus antara 1 dan 100");
    }
    if (offset < 0) {
      throw new GiziServiceError("Offset tidak boleh negatif");
    }

    try {
      const response = await apiClient.get<
        ApiResponse<RencanaGiziHistoryResponse>
      >(apiRoutes.API.ANAK.GIZI.RENCANA.HISTORY(anakId, limit, offset));

      if (!response.data?.data) {
        throw new GiziServiceError("Data riwayat rencana gizi tidak ditemukan");
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof GiziServiceError) throw error;
      handleServiceError(error, `getRencanaHistory(anakId: ${anakId})`);
    }
  }

  /**
   * POST /api/anak/:anakId/gizi/rencana/:rencanaId/complete
   * Mark a weekly plan as completed
   */
  async completeRencana(
    anakId: number,
    rencanaId: number,
  ): Promise<RencanaGiziDetailResponse> {
    if (!anakId || anakId <= 0) {
      throw new GiziServiceError("ID anak tidak valid");
    }
    if (!rencanaId || rencanaId <= 0) {
      throw new GiziServiceError("ID rencana tidak valid");
    }

    try {
      const response = await apiClient.post<
        ApiResponse<RencanaGiziDetailResponse>
      >(apiRoutes.API.ANAK.GIZI.RENCANA.COMPLETE(anakId, rencanaId));

      if (!response.data?.data) {
        throw new GiziServiceError(
          "Gagal menandai rencana gizi sebagai selesai",
        );
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof GiziServiceError) throw error;
      handleServiceError(
        error,
        `completeRencana(anakId: ${anakId}, rencanaId: ${rencanaId})`,
      );
    }
  }

  /**
   * GET /api/anak/:anakId/gizi/today
   * Get today's recommendation
   * Returns null when no recommendation exists for today (valid state)
   */
  async getTodayRecommendation(
    anakId: number,
  ): Promise<RekomendasiHarian | null> {
    if (!anakId || anakId <= 0) {
      throw new GiziServiceError("ID anak tidak valid");
    }

    try {
      const response = await apiClient.get<
        ApiResponse<RekomendasiHarian | null>
      >(apiRoutes.API.ANAK.GIZI.TODAY(anakId));

      // null is valid — no plan generated for today yet
      if (response.data?.data === undefined) {
        throw new GiziServiceError(
          "Response data rekomendasi hari ini tidak ditemukan",
        );
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof GiziServiceError) throw error;
      handleServiceError(error, `getTodayRecommendation(anakId: ${anakId})`);
    }
  }

  /**
   * GET /api/anak/:anakId/gizi/hari/:hariKe
   * Get recommendation for a specific day (1–7)
   */
  async getDailyRecommendation(
    anakId: number,
    hariKe: number,
  ): Promise<RekomendasiHarian> {
    if (!anakId || anakId <= 0) {
      throw new GiziServiceError("ID anak tidak valid");
    }
    if (!hariKe || hariKe < 1 || hariKe > 7) {
      throw new GiziServiceError("Hari ke harus antara 1 dan 7");
    }

    try {
      const response = await apiClient.get<ApiResponse<RekomendasiHarian>>(
        apiRoutes.API.ANAK.GIZI.HARI(anakId, hariKe),
      );

      if (!response.data?.data) {
        throw new GiziServiceError(
          `Rekomendasi untuk hari ke-${hariKe} tidak ditemukan`,
        );
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof GiziServiceError) throw error;
      handleServiceError(
        error,
        `getDailyRecommendation(anakId: ${anakId}, hariKe: ${hariKe})`,
      );
    }
  }

  /**
   * GET /api/anak/:anakId/gizi/progress
   * Get weekly nutrition progress with per-day breakdown
   * Returns null when no active plan exists (valid state)
   */
  async getProgress(anakId: number): Promise<GiziProgressResponse | null> {
    if (!anakId || anakId <= 0) {
      throw new GiziServiceError("ID anak tidak valid");
    }

    try {
      const response = await apiClient.get<
        ApiResponse<GiziProgressResponse | null>
      >(apiRoutes.API.ANAK.GIZI.PROGRESS(anakId));

      // null is valid — no active plan to track progress on
      if (response.data?.data === undefined) {
        throw new GiziServiceError(
          "Response data progress gizi tidak ditemukan",
        );
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof GiziServiceError) throw error;
      handleServiceError(error, `getProgress(anakId: ${anakId})`);
    }
  }

  /**
   * PATCH /api/anak/:anakId/gizi/makanan/:detailId
   * Update food consumption status and auto-recalculate daily progress
   */
  async updateMakananStatus(
    anakId: number,
    detailId: number,
    data: UpdateMakananStatusRequest,
  ): Promise<UpdateMakananStatusResponse> {
    if (!anakId || anakId <= 0) {
      throw new GiziServiceError("ID anak tidak valid");
    }
    if (!detailId || detailId <= 0) {
      throw new GiziServiceError("ID detail makanan tidak valid");
    }
    if (typeof data.status_konsumsi !== "boolean") {
      throw new GiziServiceError(
        "Status konsumsi harus berupa nilai boolean (true/false)",
      );
    }

    try {
      const response = await apiClient.patch<
        ApiResponse<UpdateMakananStatusResponse>
      >(apiRoutes.API.ANAK.GIZI.UPDATE_MAKANAN(anakId, detailId), data);

      if (!response.data?.data) {
        throw new GiziServiceError("Gagal mengupdate status konsumsi makanan");
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof GiziServiceError) throw error;
      handleServiceError(
        error,
        `updateMakananStatus(anakId: ${anakId}, detailId: ${detailId})`,
      );
    }
  }
}

export const giziService = new GiziService();
