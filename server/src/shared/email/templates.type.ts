export interface ResetPasswordTemplateData {
  userName: string;
  resetUrl: string;
}

export interface SignupTemplateData {
  userName: string;
  email: string;
}

export interface FeedbackThankYouTemplateData {
  userName: string;
  category: string;
  rating: number;
}
