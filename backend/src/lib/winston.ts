/**
 * Node modules
 */
import winston from 'winston';

/**
 * Custom modules
 */
import config from '@/config';

const { combine, timestamp, json, errors, align, printf, colorize } =
  winston.format;

// Define the transports array to hold different logging transports
const transports: winston.transport[] = [];

// If the application is not running in production, add a console transport
if (config.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }), // Add colors to log
        timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }), // Add timestamp to log
        align(), // Align log messages
        printf(({ timestamp, level, message, ...meta }) => {
          const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
          return `${timestamp} [${level}]: ${message} ${metaStr}`;
        }),
      ),
    }),
  );
}

// Create a logger instance using winston
const logger = winston.createLogger({
  level: config.LOG_LEVEL,
  format: combine(timestamp(), errors({ stack: true }), json()), // Format the log messages as JSON
  transports,
  silent: config.NODE_ENV === 'test', // Suppress logging in test environment
});

export { logger };
