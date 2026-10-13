import Handlebars from 'handlebars';

export interface FeedbackThankYouTemplateData {
  userName: string;
  category: string;
  rating: number;
}

export const feedbackThankYouTemplate =
  Handlebars.compile<FeedbackThankYouTemplateData>(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Thank You for Your Feedback</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,Helvetica,sans-serif;color:#111111;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f5;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:#ffffff;border:1px solid #e5e5e5;border-radius:16px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td align="center" style="padding:32px 24px;background-color:#111111;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.3;font-weight:700;letter-spacing:-0.5px;">
                Time Table
              </h1>
              <p style="margin:8px 0 0;color:#d4d4d4;font-size:13px;line-height:1.5;">
                PLAN SMARTER. ACHIEVE MORE.
              </p>
            </td>
          </tr>

          <!-- Main content -->
          <tr>
            <td style="padding:40px 32px 32px;">
              <p style="margin:0 0 12px;color:#737373;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;text-align:center;">
                Feedback Received
              </p>

              <h2 style="margin:0;color:#111111;font-size:27px;line-height:1.35;font-weight:700;text-align:center;">
                Thank You, {{userName}}!
              </h2>

              <p style="margin:16px 0 0;color:#525252;font-size:15px;line-height:1.8;text-align:center;">
                Thank you for taking the time to share your feedback with us. Your thoughts help us improve Time Table and create a better experience for everyone.
              </p>

              <!-- Confirmation -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:30px;background-color:#fafafa;border:1px solid #e5e5e5;border-radius:12px;">
                <tr>
                  <td align="center" style="padding:24px;">
                    <p style="margin:0 0 18px;color:#737373;font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;">
                      YOUR SUBMISSION
                    </p>

                    <p style="margin:0 0 6px;color:#737373;font-size:12px;">
                      Feedback category
                    </p>
                    <p style="margin:0 0 20px;color:#111111;font-size:15px;font-weight:700;">
                      {{category}}
                    </p>

                    <p style="margin:0 0 8px;color:#737373;font-size:12px;">
                      Your rating
                    </p>
                    <p style="margin:0;color:#111111;font-size:24px;font-weight:700;letter-spacing:3px;">
                      {{rating}} / 5
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Closing message -->
              <p style="margin:28px 0 0;color:#525252;font-size:14px;line-height:1.8;text-align:center;">
                Every suggestion, report, and idea matters. Our team will review your feedback and use it to guide future improvements.
              </p>

              <p style="margin:24px 0 0;color:#737373;font-size:12px;line-height:1.8;text-align:center;">
                Thank you for being part of the Time Table community.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:22px 24px;background-color:#fafafa;border-top:1px solid #eeeeee;">
              <p style="margin:0;color:#111111;font-size:13px;font-weight:700;">
                Time Table
              </p>
              <p style="margin:8px 0 0;color:#737373;font-size:11px;line-height:1.7;">
                © 2026 Time Table. All rights reserved.
              </p>
              <p style="margin:8px 0 0;color:#a3a3a3;font-size:11px;line-height:1.7;">
                This is an automated email. Please do not reply.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`);
