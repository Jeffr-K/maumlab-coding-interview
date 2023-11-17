import {
  Inject,
  Injectable,
  Logger,
  LoggerService,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { customWinstonLogger } from "./winston";


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // constructor(@Inject(Logger) private readonly logger: LoggerService) {}
  constructor() {}

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent');

    res.on('finish', () => {
      const { statusCode } = res;
      if (statusCode >= 200 && statusCode < 300) {
        console.log(`${res.statusCode} ${res.get('as')}`);
      }
      if (statusCode >= 400 && statusCode < 500)
        customWinstonLogger.warn(`[${method}]${originalUrl}(${statusCode}) ${ip} ${userAgent}`);
      else if (statusCode >= 500) customWinstonLogger.error(`[${method}]${originalUrl}(${statusCode}) ${ip} ${userAgent}`);

      // switch (true) {
      //   case statusCode >= 200 && statusCode < 300:
      //     customWinstonLogger.log(`${method} ${originalUrl} ${statusCode} ${ip} ${userAgent}`)
      //     break;
      //   case statusCode >= 300 && statusCode < 400:
      //     customWinstonLogger.verbose(`${method} ${originalUrl} ${statusCode} ${ip} ${userAgent}`)
      //     break;
      //   case statusCode >= 400 && statusCode < 500:
      //     customWinstonLogger.error(`${method} ${originalUrl} ${statusCode} ${ip} ${userAgent}`)
      //     break;
      //   case statusCode >= 500 && statusCode < 600:
      //     customWinstonLogger.error(`${method} ${originalUrl} ${statusCode} ${ip} ${userAgent}`)
      //     break;
      //   default:
      //     break;
      // }
    });

    next();
  }
}