import type { ConnectOptions } from 'mongoose';

export const mongodbConfig: ConnectOptions = {
  minPoolSize: 5,
  maxPoolSize: 20,

  maxIdleTimeMS: 30_000,
  serverSelectionTimeoutMS: 5_000,
  socketTimeoutMS: 45_000,
  heartbeatFrequencyMS: 10_000,

  retryWrites: true,
};
