import apiClient from "../client";
import type { ApiResponse } from "@/lib/types";
import type {
  ReminderResponse,
  CreateReminderRequest,
  UpdateReminderRequest,
} from "@/lib/types/reminder.types";
import { apiRoutes } from "@/lib/types/constants";
import axios from "axios";

// ----------------------------------------------------------------
// Error Class
// ----------------------------------------------------------------

class ReminderServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown,
  ) {
    super(message);
    this.name = "ReminderServiceError";
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
      throw new ReminderServiceError(
        serverMessage ?? "Permintaan tidak valid",
        statusCode,
        error,
      );
    }
    if (statusCode === 401) {
      throw new ReminderServiceError(
        "Sesi telah berakhir, silakan login ulang",
        statusCode,
        error,
      );
    }
    if (statusCode === 403) {
      throw new ReminderServiceError(
        "Anda tidak memiliki akses ke data anak ini",
        statusCode,
        error,
      );
    }
    if (statusCode === 404) {
      throw new ReminderServiceError(
        `Data tidak ditemukan: ${context}`,
        statusCode,
        error,
      );
    }
    if (statusCode === 422) {
      throw new ReminderServiceError(
        `Data tidak valid: ${serverMessage ?? context}`,
        statusCode,
        error,
      );
    }
    if (statusCode && statusCode >= 500) {
      throw new ReminderServiceError(
        `Server error: ${context}`,
        statusCode,
        error,
      );
    }

    throw new ReminderServiceError(
      serverMessage ?? `Terjadi kesalahan: ${context}`,
      statusCode,
      error,
    );
  }

  throw new ReminderServiceError(
    `Unexpected error on: ${context}`,
    undefined,
    error,
  );
}

// ----------------------------------------------------------------
// Service
// ----------------------------------------------------------------

class ReminderService {
  /**
   * GET /api/anak/:anakId/reminder
   * Get all reminders for a child
   */
  async getByAnakId(
    anakId: number,
    activeOnly = false,
  ): Promise<ReminderResponse[]> {
    if (!anakId || anakId <= 0) {
      throw new ReminderServiceError("ID anak tidak valid");
    }

    try {
      const response = await apiClient.get<
        ApiResponse<ReminderResponse[]>
      >(apiRoutes.API.ANAK.REMINDER.LIST(anakId, activeOnly));

      if (!response.data?.data) {
        throw new ReminderServiceError("Data reminder tidak ditemukan");
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof ReminderServiceError) throw error;
      handleServiceError(error, `getByAnakId(anakId: ${anakId})`);
    }
  }

  /**
   * GET /api/anak/:anakId/reminder/:reminderId
   * Get a single reminder by ID
   */
  async getById(
    anakId: number,
    reminderId: number,
  ): Promise<ReminderResponse> {
    if (!anakId || anakId <= 0) {
      throw new ReminderServiceError("ID anak tidak valid");
    }
    if (!reminderId || reminderId <= 0) {
      throw new ReminderServiceError("ID reminder tidak valid");
    }

    try {
      const response = await apiClient.get<ApiResponse<ReminderResponse>>(
        apiRoutes.API.ANAK.REMINDER.DETAIL(anakId, reminderId),
      );

      if (!response.data?.data) {
        throw new ReminderServiceError("Data reminder tidak ditemukan");
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof ReminderServiceError) throw error;
      handleServiceError(
        error,
        `getById(anakId: ${anakId}, reminderId: ${reminderId})`,
      );
    }
  }

  /**
   * POST /api/anak/:anakId/reminder
   * Create a new reminder
   */
  async create(
    anakId: number,
    data: CreateReminderRequest,
  ): Promise<ReminderResponse> {
    if (!anakId || anakId <= 0) {
      throw new ReminderServiceError("ID anak tidak valid");
    }
    if (!data || !data.waktu_reminder) {
      throw new ReminderServiceError("Waktu reminder tidak boleh kosong");
    }

    try {
      const response = await apiClient.post<ApiResponse<ReminderResponse>>(
        apiRoutes.API.ANAK.REMINDER.CREATE(anakId),
        data,
      );

      if (!response.data?.data) {
        throw new ReminderServiceError("Gagal membuat reminder");
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof ReminderServiceError) throw error;
      handleServiceError(error, `create(anakId: ${anakId})`);
    }
  }

  /**
   * PUT /api/anak/:anakId/reminder/:reminderId
   * Update an existing reminder
   */
  async update(
    anakId: number,
    reminderId: number,
    data: UpdateReminderRequest,
  ): Promise<ReminderResponse> {
    if (!anakId || anakId <= 0) {
      throw new ReminderServiceError("ID anak tidak valid");
    }
    if (!reminderId || reminderId <= 0) {
      throw new ReminderServiceError("ID reminder tidak valid");
    }
    if (!data || Object.keys(data).length === 0) {
      throw new ReminderServiceError("Data update tidak boleh kosong");
    }

    try {
      const response = await apiClient.put<ApiResponse<ReminderResponse>>(
        apiRoutes.API.ANAK.REMINDER.DETAIL(anakId, reminderId),
        data,
      );

      if (!response.data?.data) {
        throw new ReminderServiceError("Gagal mengupdate reminder");
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof ReminderServiceError) throw error;
      handleServiceError(
        error,
        `update(anakId: ${anakId}, reminderId: ${reminderId})`,
      );
    }
  }

  /**
   * PATCH /api/anak/:anakId/reminder/:reminderId/toggle
   * Toggle reminder active status
   */
  async toggleActive(
    anakId: number,
    reminderId: number,
  ): Promise<ReminderResponse> {
    if (!anakId || anakId <= 0) {
      throw new ReminderServiceError("ID anak tidak valid");
    }
    if (!reminderId || reminderId <= 0) {
      throw new ReminderServiceError("ID reminder tidak valid");
    }

    try {
      const response = await apiClient.patch<ApiResponse<ReminderResponse>>(
        apiRoutes.API.ANAK.REMINDER.TOGGLE(anakId, reminderId),
      );

      if (!response.data?.data) {
        throw new ReminderServiceError("Gagal mengubah status reminder");
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof ReminderServiceError) throw error;
      handleServiceError(
        error,
        `toggleActive(anakId: ${anakId}, reminderId: ${reminderId})`,
      );
    }
  }

  /**
   * DELETE /api/anak/:anakId/reminder/:reminderId
   * Delete a reminder
   */
  async delete(anakId: number, reminderId: number): Promise<string> {
    if (!anakId || anakId <= 0) {
      throw new ReminderServiceError("ID anak tidak valid");
    }
    if (!reminderId || reminderId <= 0) {
      throw new ReminderServiceError("ID reminder tidak valid");
    }

    try {
      const response = await apiClient.delete(
        apiRoutes.API.ANAK.REMINDER.DETAIL(anakId, reminderId),
      );

      if (!response.data?.message) {
        throw new ReminderServiceError("Gagal menghapus reminder");
      }

      return response.data.message as string;
    } catch (error) {
      if (error instanceof ReminderServiceError) throw error;
      handleServiceError(
        error,
        `delete(anakId: ${anakId}, reminderId: ${reminderId})`,
      );
    }
  }

  /**
   * POST /api/anak/:anakId/reminder/default
   * Generate default reminders for a child
   */
  async generateDefaults(anakId: number): Promise<ReminderResponse[]> {
    if (!anakId || anakId <= 0) {
      throw new ReminderServiceError("ID anak tidak valid");
    }

    try {
      const response = await apiClient.post<
        ApiResponse<ReminderResponse[]>
      >(apiRoutes.API.ANAK.REMINDER.GENERATE_DEFAULTS(anakId));

      if (!response.data?.data) {
        throw new ReminderServiceError("Gagal membuat default reminder");
      }

      return response.data.data;
    } catch (error) {
      if (error instanceof ReminderServiceError) throw error;
      handleServiceError(error, `generateDefaults(anakId: ${anakId})`);
    }
  }
}

export const reminderService = new ReminderService();
