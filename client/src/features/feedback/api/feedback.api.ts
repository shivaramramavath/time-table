import { httpClient } from "@/shared/lib/http/http-client";
import type { Feedback } from "../types/feedback.types";

export interface PaginatedFeedbackResponse {
  data: Feedback[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

class FeedbackApi {
  private readonly path = "/feedbacks";

  async create(payload: {
    message: string;
    rating: 1 | 2 | 3 | 4 | 5;
    category:
      | "general"
      | "bug"
      | "feature-request"
      | "ui-ux"
      | "performance"
      | "other";
  }) {
    const response = await httpClient.post<Feedback>(this.path, payload);

    return response.data;
  }

  async getMyFeedback(
    page = 1,
    limit = 20,
  ): Promise<PaginatedFeedbackResponse> {
    const response = await httpClient.get<PaginatedFeedbackResponse>(
      `${this.path}/my`,
      { params: { page, limit } },
    );

    return response.data;
  }

  async getMyFeedbackById(feedbackId: string) {
    const response = await httpClient.get<Feedback>(
      `${this.path}/my/${feedbackId}`,
    );

    return response.data;
  }

  async deleteMyFeedback(feedbackId: string) {
    const response = await httpClient.delete(`${this.path}/my/${feedbackId}`);

    return response.data;
  }
}

export const feedbackApi = new FeedbackApi();
