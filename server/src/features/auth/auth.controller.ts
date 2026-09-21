import type { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

import { AuthService } from './auth.service.js';
import { CookieService } from './services/cookie.service.js';
import { GoogleService } from './services/google.service.js';
import { errors } from '#utils/errors.js';

export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
    private readonly googleService: GoogleService,
  ) {}

  register = expressAsyncHandler(async (req: Request, res: Response) => {
    const { user, accessToken, refreshToken } = await this.authService.register(req.body);

    this.cookieService.set(res, 'refreshToken', refreshToken);

    res.status(201).json({
      success: true,
      user,
      token: accessToken,
    });
  });

  login = expressAsyncHandler(async (req: Request, res: Response) => {
    const { user, accessToken, refreshToken } = await this.authService.login(req.body);

    this.cookieService.set(res, 'refreshToken', refreshToken);

    res.status(200).json({
      success: true,
      user,
      token: accessToken,
    });
  });

  googleLogin = expressAsyncHandler(async (req: Request, res: Response) => {
    const { googleToken } = req.body;

    if (!googleToken) {
      throw errors.badRequest('Google token is required');
    }

    const googleUser = await this.googleService.verifyAccessToken(googleToken);

    if (!googleUser.email) {
      throw errors.badRequest('Google account email not available');
    }

    const { user, accessToken, refreshToken } = await this.authService.googleLogin(
      googleUser.email,
    );

    this.cookieService.set(res, 'refreshToken', refreshToken);

    res.status(200).json({
      success: true,
      user,
      token: accessToken,
    });
  });

  googleRegister = expressAsyncHandler(async (req: Request, res: Response) => {
    const { googleToken } = req.body;

    if (!googleToken) {
      throw errors.badRequest('Google token is required');
    }

    const googleUser = await this.googleService.verifyAccessToken(googleToken);

    if (!googleUser.email) {
      throw errors.badRequest('Google account email not available');
    }

    const { user, accessToken, refreshToken } = await this.authService.googleRegister({
      email: googleUser.email,
    });

    this.cookieService.set(res, 'refreshToken', refreshToken);

    res.status(201).json({
      success: true,
      user,
      token: accessToken,
    });
  });

  logout = expressAsyncHandler(async (req: Request, res: Response) => {
    const refreshToken = this.cookieService.get(req, 'refreshToken');

    await this.authService.logout(refreshToken);

    this.cookieService.remove(res, 'refreshToken');

    res.status(200).json({
      success: true,
    });
  });

  refresh = expressAsyncHandler(async (req: Request, res: Response) => {
    const refreshToken = this.cookieService.get(req, 'refreshToken');

    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refresh(refreshToken);

    this.cookieService.set(res, 'refreshToken', newRefreshToken);

    res.status(200).json({
      success: true,
      token: accessToken,
    });
  });

  me = expressAsyncHandler(async (req: Request, res: Response) => {
    const user = await this.authService.me(req.userId);

    res.status(200).json({
      success: true,
      user,
    });
  });

  forgotPassword = expressAsyncHandler(async (req: Request, res: Response) => {
    await this.authService.forgotPassword(req.body.email);

    res.status(200).json({
      success: true,
      message: 'Check your email',
    });
  });

  resetPassword = expressAsyncHandler(async (req: Request, res: Response) => {
    const { password, token } = req.body;

    await this.authService.resetPassword(token, password);

    res.status(200).json({
      success: true,
      message: 'Password reset successfully',
    });
  });
}
