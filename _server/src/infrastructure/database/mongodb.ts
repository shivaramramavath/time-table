import mongoose from 'mongoose';

import { env } from '#configs/env.js';
import logger from '#configs/logger.js';
import { mongodbConfig } from '#configs/database.config.js';

export class Database {
  constructor(
    private readonly uri: string,
    private readonly options = mongodbConfig,
  ) {
    this.registerEvents();
  }

  private registerEvents(): void {
    mongoose.connection.on('connected', () => {
      logger.info('Connected to database');
    });

    mongoose.connection.on('disconnected', () => {
      logger.info('Disconnected from database');
    });

    mongoose.connection.on('error', (error) => {
      logger.error('Database connection error', error);
    });
  }

  async connect(retries = 5, delay = 2000): Promise<void> {
    try {
      await mongoose.connect(this.uri, this.options);
    } catch (error) {
      await this.handleConnectionError(error, retries, delay);
    }
  }

  private async handleConnectionError(
    error: unknown,
    retries: number,
    delay: number,
  ): Promise<void> {
    if (retries === 0) {
      logger.error('Database connection failed. No retries left.', error);

      process.exit(1);
    }

    logger.warn(`Retrying database connection in ${delay / 1000}s (${retries} retries left)...`);

    await this.sleep(delay);

    await this.connect(retries - 1, delay);
  }

  private async sleep(delay: number): Promise<void> {
    await new Promise<void>((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }
}

export const database = new Database(env.MONGODB_URI, mongodbConfig);
