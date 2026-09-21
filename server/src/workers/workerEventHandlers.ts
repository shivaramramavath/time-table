import logger from '#configs/logger.js';

import type { Worker } from 'bullmq';

const workerEventHandlers = (worker: Worker): void => {
  const workerName = worker.name;

  worker.on('ready', () => {
    logger.info(`Worker ready: ${workerName}`);
  });

  worker.on('active', (job) => {
    logger.info(`Job ${job.name} (${job.id}) started in ${workerName}`);
  });

  worker.on('completed', (job) => {
    logger.info(`Job ${job.name} (${job.id}) completed in ${workerName}`);
  });

  worker.on('failed', (job, err) => {
    logger.error(`Job ${job?.name} (${job?.id}) failed in ${workerName}`, {
      message: err.message,
    });
  });

  worker.on('stalled', (jobId) => {
    logger.warn(`Job ${jobId} stalled in ${workerName}`);
  });

  worker.on('error', (err) => {
    logger.error(`Worker error in ${workerName}`, {
      message: err.message,
    });
  });
};

export default workerEventHandlers;
