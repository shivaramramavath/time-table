import createRateLimiter from '#middlewares/rateLimiter.js';

const createSectionLimiter = createRateLimiter({
  keyPrefix: 'createSection',
  points: 15,
  duration: 60,
  blockDuration: 30,
});

const getSectionsLimiter = createRateLimiter({
  keyPrefix: 'getSections',
  points: 100,
  duration: 60,
  blockDuration: 15,
});

const deleteSectionLimiter = createRateLimiter({
  keyPrefix: 'deleteSection',
  points: 10,
  duration: 60,
  blockDuration: 60,
});

const renameSectionLimiter = createRateLimiter({
  keyPrefix: 'renameSection',
  points: 30,
  duration: 60,
  blockDuration: 30,
});

export default {
  createSectionLimiter,
  getSectionsLimiter,
  deleteSectionLimiter,
  renameSectionLimiter,
};
