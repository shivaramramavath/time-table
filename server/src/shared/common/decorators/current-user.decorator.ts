import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import type {
  AuthenticatedRequest,
  AuthenticatedUser,
} from '../guards/authenticate.guard';

export const CurrentUser = createParamDecorator<
  keyof AuthenticatedUser | undefined
>((data, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
  const user = request.user;

  return data ? user?.[data] : user;
});
