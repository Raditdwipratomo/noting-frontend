import apiClient from "../client";
import type { ApiResponse } from "@/lib/types";
import {
  AlergiResponse,
  AlergiSummaryResponse,
  CreateAlergiRequest,
  UpdateAlergiRequest,
} from "@/lib/types/alergi.types";
import { apiRoutes } from "@/lib/types/constants";
import axios from "axios";

// ----------------------------------------------------------------
// Error Class
// ----------------------------------------------------------------

class AlergiServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown,
  ) {
    super(message);
    this.name = "AlergiServiceError";
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
      throw new AlergiServiceError(
        serverMessage ?? "Permintaan tidak valid",
        statusCode,
        error,
      );
    }
    if (statusCode === 401) {
      throw new AlergiServiceError(
        "Sesi telah berakhir, silakan login ulang",
        statusCode,
        error,
      );
    }
    if (statusCode === 403) {
      throw new AlergiServiceError(
        "Anda tidak memiliki akses ke data anak ini",
        statusCode,
        error,
      );
    }
    if (statusCode === 404) {
      throw new AlergiServiceError(
        `Data tidak ditemukan: ${context}`,
        statusCode,
        error,
      );
    }
    if (statusCode === 422) {
      throw new AlergiServiceError(
        `Data tidak valid: ${serverMessage ?? context}`,
        statusCode,
        error,
      );
    }
    if (statusCode && statusCode >= 500) {
      throw new AlergiServiceError(
        `Server error: ${context}`,
        statusCode,
        error,
      );
    }

    throw new AlergiServiceError(
      serverMessage ?? `Terjadi kesalahan: ${context}`,
      statusCode,
      error,
    );
  }

  throw new AlergiServiceError(
    `Unexpected error on: ${context}`,
    undefined,
    error,
  );
}

// ----------------------------------------------------------------
// Service
// ----------------------------------------------------------------

class AlergiService {
  /**
   * POST /api/anak/:anakId/alergi
   * Add a new allergy record for a child
   */
  async create(
    anakId: number,
    data: CreateAlergiRequest,
  ): Promise<AlergiResponse> {
    if (!anakId || anakId <= 0) {
      throw new AlergiServiceError("ID anak tidak valid");
    }
    if (!data || Object.keys(data).length === 0) {
      throw new AlergiServiceError("Data alergi tidak boleh kosong");
    }
    if (!data.nama_alergi || data.nama_alergi.trim() === "") {
      throw new AlergiServiceError("Nama alergi tidak boleh kosong");
    }
    if (!data.jenis_alergi) {
      throw new AlergiServiceError("Jenis alergi tidak boleh kosong");
    }
    if (!data.tingkat_keparahan) {
      throw new AlergiServiceError("Tingkat keparahan tidak boleh kosong");
    }
    if (!data.gejala || data.gejala.trim() === "") {
      throw new AlergiServiceError("Gejala tidak boleh kosong");
    }

    try {
      const response = await apiClient.post<ApiResponse<AlergiResponse>>(
        apiRoutes.API.ANAK.ALERGI.CREATE(anakId),
        data,
      );

      if (!response.data?.data) {
        throw new AlergiServiceError("Gagal menambahkan data alergi");
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof AlergiServiceError) throw error;
      handleServiceError(error, `create(anakId: ${anakId})`);
    }
  }

  /**
   * GET /api/anak/:anakId/alergi
   * Get all allergy records for a child
   */
  async getAll(anakId: number): Promise<AlergiResponse[]> {
    if (!anakId || anakId <= 0) {
      throw new AlergiServiceError("ID anak tidak valid");
    }

    try {
      const response = await apiClient.get<ApiResponse<AlergiResponse[]>>(
        apiRoutes.API.ANAK.ALERGI.LIST(anakId),
      );

      if (!response.data?.data) {
        throw new AlergiServiceError("Data alergi tidak ditemukan");
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof AlergiServiceError) throw error;
      handleServiceError(error, `getAll(anakId: ${anakId})`);
    }
  }

  /**
   * PUT /api/anak/:anakId/alergi/:alergiId
   * Update an existing allergy record
   */
  async update(
    anakId: number,
    alergiId: number,
    data: UpdateAlergiRequest,
  ): Promise<AlergiResponse> {
    if (!anakId || anakId <= 0) {
      throw new AlergiServiceError("ID anak tidak valid");
    }
    if (!alergiId || alergiId <= 0) {
      throw new AlergiServiceError("ID alergi tidak valid");
    }
    if (!data || Object.keys(data).length === 0) {
      throw new AlergiServiceError("Data update tidak boleh kosong");
    }

    try {
      const response = await apiClient.put<ApiResponse<AlergiResponse>>(
        apiRoutes.API.ANAK.ALERGI.DETAIL(anakId, alergiId),
        data,
      );

      if (!response.data?.data) {
        throw new AlergiServiceError("Gagal mengupdate data alergi");
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof AlergiServiceError) throw error;
      handleServiceError(
        error,
        `update(anakId: ${anakId}, alergiId: ${alergiId})`,
      );
    }
  }

  /**
   * DELETE /api/anak/:anakId/alergi/:alergiId
   * Delete an allergy record
   */
  async delete(anakId: number, alergiId: number): Promise<string> {
    if (!anakId || anakId <= 0) {
      throw new AlergiServiceError("ID anak tidak valid");
    }
    if (!alergiId || alergiId <= 0) {
      throw new AlergiServiceError("ID alergi tidak valid");
    }

    try {
      const response = await apiClient.delete(
        apiRoutes.API.ANAK.ALERGI.DETAIL(anakId, alergiId),
      );

      if (!response.data?.message) {
        throw new AlergiServiceError("Gagal menghapus data alergi");
      }

      return response.data.message as string;
    } catch (error) {
      if (error instanceof AlergiServiceError) throw error;
      handleServiceError(
        error,
        `delete(anakId: ${anakId}, alergiId: ${alergiId})`,
      );
    }
  }

  /**
   * GET /api/anak/:anakId/alergi/summary
   * Get allergy summary grouped by type and severity
   */
  async getSummary(anakId: number): Promise<AlergiSummaryResponse> {
    if (!anakId || anakId <= 0) {
      throw new AlergiServiceError("ID anak tidak valid");
    }

    try {
      const response = await apiClient.get<ApiResponse<AlergiSummaryResponse>>(
        apiRoutes.API.ANAK.ALERGI.SUMMARY(anakId),
      );

      if (!response.data?.data) {
        throw new AlergiServiceError("Data ringkasan alergi tidak ditemukan");
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof AlergiServiceError) throw error;
      handleServiceError(error, `getSummary(anakId: ${anakId})`);
    }
  }
}

export const alergiService = new AlergiService();
