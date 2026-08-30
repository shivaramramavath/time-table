import { sendEmail } from "#services/send-email.js";
import loadHtml from "#utils/loadHtml.js";
import { env } from "#configs/env.js";

type ForgotPassword = {
  token: string;
};

type RegisterGreeting = {
  userName: string;
};

export const emailProcessor = {
  forgotPassword: async (email: string, { token }: ForgotPassword) => {
    const resetUrl = `${env.ORIGIN_URL}/reset-password?token=${token}`;
    const html = await loadHtml("email.forgot-password.ejs", { resetUrl });
    return await sendEmail(email, "Password Reset", html);
  },

  registerGreeting: async (email: string, { userName }: RegisterGreeting) => {
    const html = await loadHtml("email.register-greeting.ejs", {
      userName,
      email,
    });
    return await sendEmail(email, "Welcome to Time Table", html);
  },

  feedback: async (feedback: any) => {
    const html = await loadHtml("email.feedback.ejs", feedback);
    return await sendEmail(env.EMAIL_ID, "Feedback", html);
  },
};
