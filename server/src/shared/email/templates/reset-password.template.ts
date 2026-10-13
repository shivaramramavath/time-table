import Handlebars from 'handlebars';

export interface ResetPasswordTemplateData {
  userName: string;
  resetUrl: string;
}

export const resetPasswordTemplate =
  Handlebars.compile<ResetPasswordTemplateData>(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Reset Your Password - Time Table</title>
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
                ACCOUNT SECURITY
              </p>
            </td>
          </tr>

          <!-- Main content -->
          <tr>
            <td style="padding:40px 32px 36px;">
              <!-- Icon -->
              <table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" width="64" height="64" style="width:64px;height:64px;background-color:#f4f4f5;border:1px solid #e5e5e5;border-radius:50%;font-size:27px;line-height:64px;">
                    &#128274;
                  </td>
                </tr>
              </table>

              <p style="margin:26px 0 10px;color:#737373;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;text-align:center;">
                Password Reset Request
              </p>

              <h2 style="margin:0;color:#111111;font-size:27px;line-height:1.35;font-weight:700;text-align:center;">
                Forgot your password?
              </h2>

              <p style="margin:18px 0 0;color:#525252;font-size:15px;line-height:1.8;text-align:center;">
                Hello {{userName}}, we received a request to reset the password for your Time Table account.
              </p>

              <p style="margin:12px 0 0;color:#525252;font-size:14px;line-height:1.8;text-align:center;">
                Click the button below to choose a new password and regain access to your account.
              </p>

              <!-- CTA button -->
              <table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0" style="margin:30px auto;">
                <tr>
                  <td align="center" bgcolor="#111111" style="background-color:#111111;border-radius:8px;">
                    <a href="{{resetUrl}}" target="_blank" style="display:inline-block;padding:15px 32px;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;text-decoration:none;border-radius:8px;">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Security notice -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fafafa;border:1px solid #e5e5e5;border-radius:12px;">
                <tr>
                  <td style="padding:18px 20px;">
                    <p style="margin:0 0 8px;color:#111111;font-size:13px;font-weight:700;">
                      Security notice
                    </p>
                    <p style="margin:0;color:#525252;font-size:12px;line-height:1.8;">
                      If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:24px 0 0;color:#737373;font-size:12px;line-height:1.8;text-align:center;">
                For your security, this reset link is time-limited and should not be shared with anyone.
              </p>

              <p style="margin:22px 0 0;color:#737373;font-size:12px;line-height:1.8;">
                If the button doesn't work, copy and paste this link into your browser:
              </p>
              <p style="margin:8px 0 0;font-size:12px;line-height:1.7;word-break:break-all;">
                <a href="{{resetUrl}}" target="_blank" style="color:#111111;text-decoration:underline;">{{resetUrl}}</a>
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
                This is an automated security email. Please do not reply.
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
