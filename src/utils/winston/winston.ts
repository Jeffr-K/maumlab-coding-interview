import { utilities, WinstonModule } from 'nest-winston';
import * as winstonDaily from 'winston-daily-rotate-file';
import * as winston from 'winston';
import { config } from "dotenv";
config();

const env = process.env.NODE_ENV;

const logDir = __dirname + '/../../logs';

const dailyOptions = (level: string) => {
  return {
    level,
    datePattern: 'YYYY-MM-DD-HH-mm',
    dirname: logDir + `/${level}`,
    filename: `%DATE%.${level}.log`,
    maxFiles: 60 * 24,
    zippedArchive: true,
  };
};

export const customWinstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: env === 'production' ? 'http' : 'silly',
      format:
        env === 'production'
          ? winston.format.simple()
          : winston.format.combine(
            winston.format.timestamp({}),
            utilities.format.nestLike('MaumLabs', {
              prettyPrint: true,
              colors: true
            }),
          ),
    }),
    new winstonDaily(dailyOptions('info')),
    new winstonDaily(dailyOptions('warn')),
    new winstonDaily(dailyOptions('error')),
    new winston.transports.File(dailyOptions('info')),
    new winston.transports.File(dailyOptions('warn')),
    new winston.transports.File(dailyOptions('error')),
  ],
});
