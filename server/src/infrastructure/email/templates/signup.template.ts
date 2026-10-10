import Handlebars from 'handlebars';

export interface SignupTemplateData {
  userName: string;
  email: string;
}

export const signupTemplate = Handlebars.compile<SignupTemplateData>(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Welcome to Time Table</title>
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
                Account Created Successfully
              </p>

              <h2 style="margin:0;color:#111111;font-size:27px;line-height:1.35;font-weight:700;text-align:center;">
                Welcome, {{userName}}!
              </h2>

              <p style="margin:16px 0 0;color:#525252;font-size:15px;line-height:1.8;text-align:center;">
                We're glad you're here. Your Time Table account has been created successfully, and you're ready to get started.
              </p>

              <!-- Account details -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:30px;background-color:#fafafa;border:1px solid #e5e5e5;border-radius:12px;">
                <tr>
                  <td style="padding:22px 24px;">
                    <p style="margin:0 0 16px;color:#737373;font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;">
                      YOUR ACCOUNT
                    </p>
                    <p style="margin:0 0 6px;color:#737373;font-size:12px;">Username</p>
                    <p style="margin:0 0 18px;color:#111111;font-size:15px;font-weight:700;word-break:break-word;">
                      {{userName}}
                    </p>
                    <p style="margin:0 0 6px;color:#737373;font-size:12px;">Email address</p>
                    <p style="margin:0;color:#111111;font-size:15px;font-weight:700;word-break:break-word;">
                      {{email}}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Closing message -->
              <p style="margin:28px 0 0;color:#525252;font-size:14px;line-height:1.8;text-align:center;">
                Start organizing your schedules, classes, and daily activities in one place.
              </p>

              <p style="margin:24px 0 0;color:#737373;font-size:12px;line-height:1.8;text-align:center;">
                If you did not create this account, please contact our support team.
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
