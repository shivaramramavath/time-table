import axios from "axios";
import logger from "#configs/logger.js";
import { env } from "#configs/env.js";
import { BREVO_URL } from "#configs/constants.js";

const brevoApi = axios.create({
  baseURL: BREVO_URL,
  headers: {
    "api-key": env.BREVO_API_KEY,
    "Content-Type": "application/json",
    accept: "application/json",
  },
  timeout: 10000,
});

interface BrevoResponse {
  messageId: string;
}

export const sendEmail = async (
  toEmail: string,
  subject: string,
  htmlContent: string,
): Promise<string> => {
  try {
    const payload = {
      sender: {
        name: "Time Table",
        email: env.EMAIL_ID,
      },
      to: [{ email: toEmail }],
      subject,
      htmlContent,
    };

    const response = await brevoApi.post<BrevoResponse>("/smtp/email", payload);

    logger.info(`Email sent: ${response.data.messageId}`);

    return response.data.messageId;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errData = error.response?.data || error.message;
      logger.error("Brevo email error", errData);
    } else {
      logger.error("Unknown email error", error);
    }

    throw error;
  }
};
