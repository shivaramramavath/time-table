import createRateLimiter from '#middlewares/rateLimiter.js';

const askAiLimiter = createRateLimiter({
  keyPrefix: 'askAI',
  points: 20,
  duration: 60,
  blockDuration: 60,
});

export default { askAiLimiter };
