import apiClient from "../client";
import type { ApiResponse } from "@/lib/types";
import {
  CreateAnakRequest,
  GetAllAnakResponse,
  CreateAnakResponse,
  GetAnakResponse,
} from "@/lib/types/anak.types";
import { apiRoutes } from "@/lib/types/constants";
import axios from "axios";

class AnakServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown,
  ) {
    super(message);
    this.name = "AnakServiceError";
  }
}

function handleServiceError(error: unknown, context: string): never {
  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;
    const serverMessage = error.response?.data?.message;

    if (statusCode === 404) {
      throw new AnakServiceError(
        `Data tidak ditemukan: ${context}`,
        statusCode,
        error,
      );
    }
    if (statusCode === 401 || statusCode === 403) {
      throw new AnakServiceError(
        `Akses ditolak: ${context}`,
        statusCode,
        error,
      );
    }
    if (statusCode === 422) {
      throw new AnakServiceError(
        `Data tidak valid: ${serverMessage ?? context}`,
        statusCode,
        error,
      );
    }
    if (statusCode && statusCode >= 500) {
      throw new AnakServiceError(`Server error: ${context}`, statusCode, error);
    }

    throw new AnakServiceError(
      serverMessage ?? `Terjadi kesalahan: ${context}`,
      statusCode,
      error,
    );
  }

  throw new AnakServiceError(
    `Unexpected error on: ${context}`,
    undefined,
    error,
  );
}

class AnakService {
  async getAllAnak(): Promise<GetAllAnakResponse> {
    try {
      const response = await apiClient.get<ApiResponse<GetAllAnakResponse>>(
        apiRoutes.API.ANAK.LIST,
      );

      if (!response.data?.data) {
        throw new AnakServiceError("Data anak tidak ditemukan");
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof AnakServiceError) throw error;
      handleServiceError(error, "getAllAnak()");
    }
  }

  async createAnak(data: CreateAnakRequest): Promise<CreateAnakResponse> {
    if (!data || Object.keys(data).length === 0) {
      throw new AnakServiceError("Data anak tidak boleh kosong");
    }

    console.log("data anak", data);

    try {
      const response = await apiClient.post<ApiResponse<CreateAnakResponse>>(
        apiRoutes.API.ANAK.CREATE,
        data,
      );

      if (!response.data?.data) {
        throw new AnakServiceError("Gagal membuat data anak");
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof AnakServiceError) throw error;
      handleServiceError(error, "createAnak()");
    }
  }

  async getAnakById(anakId: number): Promise<GetAnakResponse> {
    if (!anakId || anakId <= 0) {
      throw new AnakServiceError("ID anak tidak valid");
    }

    try {
      const response = await apiClient.get<ApiResponse<GetAnakResponse>>(
        apiRoutes.API.ANAK.DETAIL(anakId),
      );

      if (!response.data?.data) {
        throw new AnakServiceError(
          `Data anak dengan ID ${anakId} tidak ditemukan`,
        );
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof AnakServiceError) throw error;
      handleServiceError(error, `getAnakById(anakId: ${anakId})`);
    }
  }

  async updateAnak(
    anakId: number,
    updateData: Partial<CreateAnakRequest>,
  ): Promise<string> {
    if (!anakId || anakId <= 0) {
      throw new AnakServiceError("ID anak tidak valid");
    }
    if (!updateData || Object.keys(updateData).length === 0) {
      throw new AnakServiceError("Data update tidak boleh kosong");
    }

    try {
      const response = await apiClient.put<ApiResponse<GetAnakResponse>>(
        apiRoutes.API.ANAK.UPDATE(anakId),
        updateData,
      );

      if (!response.data?.message) {
        throw new AnakServiceError("Gagal mengupdate data anak");
      }

      return response.data.message;
    } catch (error) {
      if (error instanceof AnakServiceError) throw error;
      handleServiceError(error, `updateAnak(anakId: ${anakId})`);
    }
  }

  async deleteAnak(anakId: number): Promise<string> {
    if (!anakId || anakId <= 0) {
      throw new AnakServiceError("ID anak tidak valid");
    }

    try {
      const response = await apiClient.delete(
        apiRoutes.API.ANAK.DELETE(anakId),
      );

      if (!response.data?.message) {
        throw new AnakServiceError("Gagal menghapus data anak");
      }

      return response.data.message as string;
    } catch (error) {
      if (error instanceof AnakServiceError) throw error;
      handleServiceError(error, `deleteAnak(anakId: ${anakId})`);
    }
  }
}

export const anakService = new AnakService();
