import createRateLimiter from '#middlewares/rateLimiter.js';

const createPageLimiter = createRateLimiter({
  keyPrefix: 'createPage',
  points: 20,
  duration: 60,
  blockDuration: 30,
});

const getPageLimiter = createRateLimiter({
  keyPrefix: 'getPage',
  points: 120,
  duration: 60,
  blockDuration: 15,
});

const getPagesLimiter = createRateLimiter({
  keyPrefix: 'getPages',
  points: 100,
  duration: 60,
  blockDuration: 15,
});

const updatePageLimiter = createRateLimiter({
  keyPrefix: 'updatePage',
  points: 40,
  duration: 60,
  blockDuration: 30,
});

const deletePageLimiter = createRateLimiter({
  keyPrefix: 'deletePage',
  points: 10,
  duration: 60,
  blockDuration: 60,
});

export default {
  createPageLimiter,
  getPageLimiter,
  getPagesLimiter,
  updatePageLimiter,
  deletePageLimiter,
};
