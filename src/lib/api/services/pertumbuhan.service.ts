import {
  GetPertumbuhanResponse,
  GrowthChartData,
  GrowthStatisticsResponse,
  PertumbuhanResponse,
  DetailPertumbuhanResponse,
  CreateGrowthResponse,
  CreateGrowthRequest,
} from "@/lib/types/pertumbuhan.types";
import apiClient from "../client";
import { ApiResponse } from "@/lib/types";
import { apiRoutes } from "@/lib/types/constants";
import axios from "axios";

class PertumbuhanServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown,
  ) {
    super(message);
    this.name = "PertumbuhanServiceError";
  }
}

function handleServiceError(error: unknown, context: string): never {
  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;
    const serverMessage = error.response?.data?.message;

    if (statusCode === 404) {
      throw new PertumbuhanServiceError(
        `Data tidak ditemukan: ${context}`,
        statusCode,
        error,
      );
    }
    if (statusCode === 401 || statusCode === 403) {
      throw new PertumbuhanServiceError(
        `Akses ditolak: ${context}`,
        statusCode,
        error,
      );
    }
    if (statusCode === 422) {
      throw new PertumbuhanServiceError(
        `Data tidak valid: ${serverMessage ?? context}`,
        statusCode,
        error,
      );
    }
    if (statusCode && statusCode >= 500) {
      throw new PertumbuhanServiceError(
        `Server error: ${context}`,
        statusCode,
        error,
      );
    }

    throw new PertumbuhanServiceError(
      serverMessage ?? `Terjadi kesalahan: ${context}`,
      statusCode,
      error,
    );
  }

  throw new PertumbuhanServiceError(
    `Unexpected error on: ${context}`,
    undefined,
    error,
  );
}

class PertumbuhanService {
  async getAllGrowth(anakId: number): Promise<GetPertumbuhanResponse> {
    if (!anakId || anakId <= 0) {
      throw new PertumbuhanServiceError("ID anak tidak valid");
    }

    try {
      const response = await apiClient.get<ApiResponse<GetPertumbuhanResponse>>(
        apiRoutes.API.ANAK.PERTUMBUHAN.LIST(anakId),
      );

      if (!response.data?.data) {
        throw new PertumbuhanServiceError("Response data tidak ditemukan");
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof PertumbuhanServiceError) throw error;
      handleServiceError(error, `getAllGrowth(anakId: ${anakId})`);
    }
  }

  async getAllGrowthWithPagination(
    anakId: number,
    limit = 10,
    offset = 0,
    orderBy: "ASC" | "DESC" = "DESC",
  ): Promise<GetPertumbuhanResponse> {
    if (!anakId || anakId <= 0) {
      throw new PertumbuhanServiceError("ID anak tidak valid");
    }
    if (limit <= 0 || limit > 100) {
      throw new PertumbuhanServiceError("Limit harus antara 1 dan 100");
    }
    if (offset < 0) {
      throw new PertumbuhanServiceError("Offset tidak boleh negatif");
    }

    try {
      const response = await apiClient.get<ApiResponse<GetPertumbuhanResponse>>(
        `${apiRoutes.API.ANAK.PERTUMBUHAN.LIST(anakId)}?limit=${limit}&offset=${offset}&orderBy=${orderBy}`,
      );

      if (!response.data?.data) {
        throw new PertumbuhanServiceError("Response data tidak ditemukan");
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof PertumbuhanServiceError) throw error;
      handleServiceError(
        error,
        `getAllGrowthWithPagination(anakId: ${anakId})`,
      );
    }
  }

  async getLatestGrowth(anakId: number): Promise<PertumbuhanResponse> {
    if (!anakId || anakId <= 0) {
      throw new PertumbuhanServiceError("ID anak tidak valid");
    }

    try {
      const response = await apiClient.get<ApiResponse<PertumbuhanResponse>>(
        apiRoutes.API.ANAK.PERTUMBUHAN.LATEST(anakId),
      );

      if (!response.data?.data) {
        throw new PertumbuhanServiceError(
          "Data pertumbuhan terbaru tidak ditemukan",
        );
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof PertumbuhanServiceError) throw error;
      handleServiceError(error, `getLatestGrowth(anakId: ${anakId})`);
    }
  }

  async getGrowthChart(
    anakId: number,
    months?: number,
  ): Promise<GrowthChartData> {
    if (!anakId || anakId <= 0) {
      throw new PertumbuhanServiceError("ID anak tidak valid");
    }
    if (months !== undefined && (months <= 0 || months > 120)) {
      throw new PertumbuhanServiceError("Rentang bulan harus antara 1 dan 120");
    }

    try {
      const response = await apiClient.get<ApiResponse<GrowthChartData>>(
        apiRoutes.API.ANAK.PERTUMBUHAN.CHART(anakId, months),
      );

      if (!response.data?.data) {
        throw new PertumbuhanServiceError("Data chart tidak ditemukan");
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof PertumbuhanServiceError) throw error;
      handleServiceError(error, `getGrowthChart(anakId: ${anakId})`);
    }
  }

  async getStatistics(anakId: string): Promise<GrowthStatisticsResponse> {
    if (!anakId || anakId.trim() === "") {
      throw new PertumbuhanServiceError("ID anak tidak valid");
    }

    try {
      const response = await apiClient.get(
        apiRoutes.API.ANAK.PERTUMBUHAN.STATISTICS(anakId),
      );

      if (!response.data?.data) {
        throw new PertumbuhanServiceError("Data statistik tidak ditemukan");
      }

      return response.data.data as GrowthStatisticsResponse;
    } catch (error) {
      if (error instanceof PertumbuhanServiceError) throw error;
      handleServiceError(error, `getStatistics(anakId: ${anakId})`);
    }
  }

  async getGrowthRecordById(
    anakId: number,
    pertumbuhanId: number,
  ): Promise<DetailPertumbuhanResponse> {
    if (!anakId || anakId <= 0) {
      throw new PertumbuhanServiceError("ID anak tidak valid");
    }
    if (!pertumbuhanId || pertumbuhanId <= 0) {
      throw new PertumbuhanServiceError("ID pertumbuhan tidak valid");
    }

    try {
      const response = await apiClient.get<
        ApiResponse<DetailPertumbuhanResponse>
      >(apiRoutes.API.ANAK.PERTUMBUHAN.DETAIL(anakId, pertumbuhanId));

      if (!response.data?.data) {
        throw new PertumbuhanServiceError("Detail pertumbuhan tidak ditemukan");
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof PertumbuhanServiceError) throw error;
      handleServiceError(
        error,
        `getGrowthRecordById(anakId: ${anakId}, pertumbuhanId: ${pertumbuhanId})`,
      );
    }
  }

  async createGrowth(
    anakId: number,
    data: CreateGrowthRequest,
  ): Promise<CreateGrowthResponse> {
    if (!anakId || anakId <= 0) {
      throw new PertumbuhanServiceError("ID anak tidak valid");
    }
    if (!data || Object.keys(data).length === 0) {
      throw new PertumbuhanServiceError("Data pertumbuhan tidak boleh kosong");
    }

    try {
      const response = await apiClient.post<ApiResponse<CreateGrowthResponse>>(
        apiRoutes.API.ANAK.PERTUMBUHAN.CREATE(anakId),
        data,
      );

      if (!response.data?.data) {
        throw new PertumbuhanServiceError("Gagal membuat data pertumbuhan");
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof PertumbuhanServiceError) throw error;
      handleServiceError(error, `createGrowth(anakId: ${anakId})`);
    }
  }

  async editGrowth(
    anakId: string,
    pertumbuhanId: string,
    updateData: Partial<CreateGrowthRequest>,
  ): Promise<PertumbuhanResponse> {
    if (!anakId || anakId.trim() === "") {
      throw new PertumbuhanServiceError("ID anak tidak valid");
    }
    if (!pertumbuhanId || pertumbuhanId.trim() === "") {
      throw new PertumbuhanServiceError("ID pertumbuhan tidak valid");
    }
    if (!updateData || Object.keys(updateData).length === 0) {
      throw new PertumbuhanServiceError("Data update tidak boleh kosong");
    }

    try {
      const response = await apiClient.put<ApiResponse<PertumbuhanResponse>>(
        apiRoutes.API.ANAK.PERTUMBUHAN.DETAIL(anakId, pertumbuhanId),
        updateData,
      );

      if (!response.data?.data) {
        throw new PertumbuhanServiceError("Gagal mengupdate data pertumbuhan");
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof PertumbuhanServiceError) throw error;
      handleServiceError(
        error,
        `editGrowth(anakId: ${anakId}, pertumbuhanId: ${pertumbuhanId})`,
      );
    }
  }

  async deleteGrowth(anakId: number, pertumbuhanId: number): Promise<string> {
    if (!anakId || anakId <= 0) {
      throw new PertumbuhanServiceError("ID anak tidak valid");
    }
    if (!pertumbuhanId || pertumbuhanId <= 0) {
      throw new PertumbuhanServiceError("ID pertumbuhan tidak valid");
    }

    try {
      const response = await apiClient.delete(
        apiRoutes.API.ANAK.PERTUMBUHAN.DETAIL(anakId, pertumbuhanId),
      );

      if (!response.data?.message) {
        throw new PertumbuhanServiceError("Gagal menghapus data pertumbuhan");
      }

      return response.data.message as string;
    } catch (error) {
      if (error instanceof PertumbuhanServiceError) throw error;
      handleServiceError(
        error,
        `deleteGrowth(anakId: ${anakId}, pertumbuhanId: ${pertumbuhanId})`,
      );
    }
  }
}

export const pertumbuhanService = new PertumbuhanService();
