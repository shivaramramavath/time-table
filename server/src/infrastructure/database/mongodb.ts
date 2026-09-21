import mongoose from 'mongoose';

import { env } from '#configs/env.js';
import logger from '#configs/logger.js';
import { mongodbConfig } from '#configs/database.config.js';

mongoose.connection.on('connected', () => {
  logger.info('Connected to database');
});

mongoose.connection.on('disconnected', () => {
  logger.info('Disconnected from database');
});

mongoose.connection.on('error', (error) => {
  logger.error('Database connection error', error);
});

const connect = async (retries = 5, delay = 2000): Promise<void> => {
  try {
    await mongoose.connect(env.MONGODB_URI, mongodbConfig);
  } catch (error) {
    if (retries === 0) {
      logger.error('Database connection failed. No retries left.', error);

      process.exit(1);
    }

    logger.warn(`Retrying database connection in ${delay / 1000}s (${retries} retries left)...`);

    await new Promise((resolve) => setTimeout(resolve, delay));

    await connect(retries - 1, delay);
  }
};

const disconnect = async (): Promise<void> => {
  await mongoose.disconnect();
};

export const database = {
  connect,
  disconnect,
};
