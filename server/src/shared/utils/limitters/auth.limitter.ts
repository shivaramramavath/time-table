import createRateLimiter from '#middlewares/rateLimiter.js';

const registerLimiter = createRateLimiter({
  keyPrefix: 'register',
  points: 5,
  duration: 60 * 15,
  blockDuration: 60 * 30,
});

const loginLimiter = createRateLimiter({
  keyPrefix: 'login',
  points: 10,
  duration: 60 * 10,
  blockDuration: 60 * 20,
});

const forgotLimiter = createRateLimiter({
  keyPrefix: 'forgotPassword',
  points: 5,
  duration: 60 * 15,
  blockDuration: 60 * 30,
});

const verifyOtpLimiter = createRateLimiter({
  keyPrefix: 'verifyOTP',
  points: 10,
  duration: 60 * 10,
  blockDuration: 60 * 20,
});

const resetPasswordLimiter = createRateLimiter({
  keyPrefix: 'resetPassword',
  points: 5,
  duration: 60 * 15,
  blockDuration: 60 * 30,
});

const authCheckLimiter = createRateLimiter({
  keyPrefix: 'authCheck',
  points: 60,
  duration: 60,
  blockDuration: 30,
});

const refreshLimiter = createRateLimiter({
  keyPrefix: 'refresh',
  points: 15,
  duration: 60,
  blockDuration: 120,
});

const logoutLimiter = createRateLimiter({
  keyPrefix: 'logout',
  points: 20,
  duration: 60,
  blockDuration: 30,
});

export default {
  registerLimiter,
  loginLimiter,
  forgotLimiter,
  verifyOtpLimiter,
  resetPasswordLimiter,
  authCheckLimiter,
  refreshLimiter,
  logoutLimiter,
};
