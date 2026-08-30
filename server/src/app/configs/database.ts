import mongoose, { type ConnectOptions } from "mongoose";
import { env } from "#configs/env.js";
import logger from "#configs/logger.js";

mongoose.connection.on("connected", () => {
  logger.info("Connected to database");
});

mongoose.connection.on("disconnected", () => {
  logger.info("Disconnected from database");
});

mongoose.connection.on("error", (error) => {
  logger.error("database connection error:", error);
});

const mongoOptions: ConnectOptions = {
  minPoolSize: 5,
  maxPoolSize: 20,

  maxIdleTimeMS: 30000,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  heartbeatFrequencyMS: 10000,

  retryWrites: true,
};

const connect = async (
  retries: number = 5,
  delay: number = 2000,
): Promise<void> => {
  const MONGODB_URI = env.MONGODB_URI;

  try {
    await mongoose.connect(MONGODB_URI, mongoOptions);
  } catch (error) {
    if (retries === 0) {
      logger.error("databse connection failed. No retries left.");
      process.exit(1);
    }

    logger.warn(
      `Retrying database connection in ${delay / 1000}s (${retries} retries left)...`,
    );

    await new Promise((resolve) => setTimeout(resolve, delay));
    await connect(retries - 1, delay);
  }
};

const disconnect = async () => await mongoose.disconnect();

export const database = {
  connect,
  disconnect,
};
