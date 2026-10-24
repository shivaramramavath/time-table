export type FeedbackRating = 1 | 2 | 3 | 4 | 5;

export type FeedbackCategory =
  | "general"
  | "bug"
  | "feature-request"
  | "ui-ux"
  | "performance"
  | "other";

export type FeedbackStatus = "pending" | "reviewed" | "resolved" | "rejected";

export interface CreateFeedback {
  message: string;
  rating: FeedbackRating;
  category: FeedbackCategory;
}

export interface Feedback {
  _id: string;
  userId: string;
  message: string;
  rating: FeedbackRating;
  category: FeedbackCategory;
  status: FeedbackStatus;
  adminResponse?: string;
  reviewedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedFeedbackResponse {
  data: Feedback[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
