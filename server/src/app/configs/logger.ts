import { env } from "#configs/env.js";
import { createLogger, format, Logger, transports } from "winston";

const { combine, timestamp, printf, colorize, errors, json } = format;

const logFormat = printf(
  ({ level, message, timestamp, stack, ...meta }): string => {
    return `${timestamp} ${level}: ${stack || message}`;
  },
);

const logger: Logger = createLogger({
  level: "info",

  format: combine(timestamp(), errors({ stack: true }), json()),

  transports: [
    new transports.Console({
      format: combine(
        env.isProd ? format.uncolorize() : colorize(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat,
      ),
    }),
  ],
});

interface LoggerStream {
  write: (message: string) => void;
}

export const stream: LoggerStream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

export default logger;
