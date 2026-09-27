import createRateLimiter from '#middlewares/security/rate-limiter.middleware.js';

const getMessagesLimiter = createRateLimiter({
  keyPrefix: 'getMessages',
  points: 120,
  duration: 60,
  blockDuration: 15,
});

export default { getMessagesLimiter };
