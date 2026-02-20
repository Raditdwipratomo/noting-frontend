import apiClient from "../client";
import type { ApiResponse } from "@/lib/types";
import {
  DiagnosaResponseData,
  DiagnosaSummaryReponse,
  DiagnosaAnalyzeResponse,
} from "@/lib/types/diagnosa.types";
import { apiRoutes } from "@/lib/types/constants";
import axios from "axios";

// ----------------------------------------------------------------
// Error Class
// ----------------------------------------------------------------

class DiagnosaServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown,
  ) {
    super(message);
    this.name = "DiagnosaServiceError";
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
      throw new DiagnosaServiceError(
        serverMessage ??
          "Permintaan tidak valid. Pastikan data pertumbuhan sudah diinput",
        statusCode,
        error,
      );
    }
    if (statusCode === 401) {
      throw new DiagnosaServiceError(
        "Sesi telah berakhir, silakan login ulang",
        statusCode,
        error,
      );
    }
    if (statusCode === 403) {
      throw new DiagnosaServiceError(
        "Anda tidak memiliki akses ke data anak ini",
        statusCode,
        error,
      );
    }
    if (statusCode === 404) {
      throw new DiagnosaServiceError(
        `Data tidak ditemukan: ${context}`,
        statusCode,
        error,
      );
    }
    if (statusCode === 422) {
      throw new DiagnosaServiceError(
        `Data tidak valid: ${serverMessage ?? context}`,
        statusCode,
        error,
      );
    }
    if (statusCode && statusCode >= 500) {
      throw new DiagnosaServiceError(
        `Server error: ${context}`,
        statusCode,
        error,
      );
    }

    throw new DiagnosaServiceError(
      serverMessage ?? `Terjadi kesalahan: ${context}`,
      statusCode,
      error,
    );
  }

  throw new DiagnosaServiceError(
    `Unexpected error on: ${context}`,
    undefined,
    error,
  );
}

// ----------------------------------------------------------------
// Service
// ----------------------------------------------------------------

class DiagnosaService {
  /**
   * GET /anak/:anakId/diagnosa
   * Fetch diagnosa history for a child
   */
  async getRiwayat(
    anakId: number,
    limit = 10,
  ): Promise<DiagnosaResponseData[]> {
    if (!anakId || anakId <= 0) {
      throw new DiagnosaServiceError("ID anak tidak valid");
    }
    if (limit <= 0 || limit > 100) {
      throw new DiagnosaServiceError("Limit harus antara 1 dan 100");
    }

    try {
      const response = await apiClient.get<ApiResponse<DiagnosaResponseData[]>>(
        `${apiRoutes.API.ANAK.DIAGNOSA.HISTORY(anakId)}?limit=${limit}`,
      );

      if (!response.data?.data) {
        throw new DiagnosaServiceError("Data riwayat diagnosa tidak ditemukan");
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof DiagnosaServiceError) throw error;
      handleServiceError(error, `getRiwayat(anakId: ${anakId})`);
    }
  }

  /**
   * GET /anak/:anakId/diagnosa/latest
   * Fetch the most recent diagnosa for a child
   * Returns null when no diagnosa exists yet (valid state)
   */
  async getLatest(anakId: number): Promise<DiagnosaResponseData | null> {
    if (!anakId || anakId <= 0) {
      throw new DiagnosaServiceError("ID anak tidak valid");
    }

    try {
      const response = await apiClient.get<
        ApiResponse<DiagnosaResponseData | null>
      >(apiRoutes.API.ANAK.DIAGNOSA.LATEST(anakId));

      // null is valid — child has no diagnosa history yet
      if (response.data?.data === undefined) {
        throw new DiagnosaServiceError(
          "Response data diagnosa tidak ditemukan",
        );
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof DiagnosaServiceError) throw error;
      handleServiceError(error, `getLatest(anakId: ${anakId})`);
    }
  }

  /**
   * POST /anak/:anakId/diagnosa/analyze
   * Trigger manual stunting analysis based on latest pertumbuhan data.
   * No request body needed — backend derives everything from stored data.
   */
  async analyze(anakId: number): Promise<DiagnosaAnalyzeResponse> {
    if (!anakId || anakId <= 0) {
      throw new DiagnosaServiceError("ID anak tidak valid");
    }

    try {
      const response = await apiClient.post<
        ApiResponse<DiagnosaAnalyzeResponse>
      >(apiRoutes.API.ANAK.DIAGNOSA.ANALYZE(anakId));

      if (!response.data?.data) {
        throw new DiagnosaServiceError(
          "Analisis stunting gagal, coba lagi nanti",
        );
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof DiagnosaServiceError) throw error;
      handleServiceError(error, `analyze(anakId: ${anakId})`);
    }
  }

  /**
   * GET /anak/:anakId/diagnosa/summary
   * Fetch diagnosa statistics and trend summary
   */
  async getSummary(anakId: number): Promise<DiagnosaSummaryReponse> {
    if (!anakId || anakId <= 0) {
      throw new DiagnosaServiceError("ID anak tidak valid");
    }

    try {
      const response = await apiClient.get<ApiResponse<DiagnosaSummaryReponse>>(
        apiRoutes.API.ANAK.DIAGNOSA.SUMMARY(anakId),
      );

      if (!response.data?.data) {
        throw new DiagnosaServiceError("Data summary diagnosa tidak ditemukan");
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof DiagnosaServiceError) throw error;
      handleServiceError(error, `getSummary(anakId: ${anakId})`);
    }
  }
}

export const diagnosaService = new DiagnosaService();
