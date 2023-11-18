import { join } from "path";
import * as winston from "winston";
import * as winstonDaily from "winston-daily-rotate-file";

const { combine, timestamp, label, printf } = winston.format;

const folderPath = join(__dirname, '..', '..', '..', 'logs');

const formatter = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = winston.createLogger({
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    label({ label: 'MaumLabs Coding Interview' }),
    formatter,
  ),
  transports: [
    new winstonDaily({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: folderPath + '/info',
      filename: `%DATE%.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: folderPath + '/error',
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
  exceptionHandlers: [
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: folderPath + '/exception',
      filename: `%DATE%.exception.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
  );
}
