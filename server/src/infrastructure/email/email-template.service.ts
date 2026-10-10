import { Injectable } from '@nestjs/common';
import {
  resetPasswordTemplate,
  type ResetPasswordTemplateData,
  signupTemplate,
  type SignupTemplateData,
} from './templates';

@Injectable()
export class EmailTemplateService {
  renderSignupGreeting(data: SignupTemplateData): string {
    return signupTemplate(data);
  }

  renderPasswordReset(data: ResetPasswordTemplateData): string {
    return resetPasswordTemplate(data);
  }
}
