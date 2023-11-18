// src/logger/logger.module.ts

import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        // new winston.transports.Console(),
        // new DailyRotateFile({
        //   level: 'error',
        //   filename: 'logs/error-%DATE%.log',
        //   datePattern: 'YYYY-MM-DD',
        //   zippedArchive: true,
        //   maxSize: '20m',
        //   maxFiles: '14d',
        // }),
        // new DailyRotateFile({
        //   level: 'warn',
        //   filename: 'logs/warn-%DATE%.log',
        //   datePattern: 'YYYY-MM-DD',
        //   zippedArchive: true,
        //   maxSize: '20m',
        //   maxFiles: '14d',
        // }),
        // new DailyRotateFile({
        //   level: 'info',
        //   filename: 'logs/info-%DATE%.log',
        //   datePattern: 'YYYY-MM-DD',
        //   zippedArchive: true,
        //   maxSize: '20m',
        //   maxFiles: '14d',
        // }),
        // new DailyRotateFile({
        //   level: 'verbose',
        //   filename: 'logs/verbose-%DATE%.log',
        //   datePattern: 'YYYY-MM-DD',
        //   zippedArchive: true,
        //   maxSize: '20m',
        //   maxFiles: '14d',
        // }),
        // new DailyRotateFile({
        //   level: 'debug',
        //   filename: 'logs/debug-%DATE%.log',
        //   datePattern: 'YYYY-MM-DD',
        //   zippedArchive: true,
        //   maxSize: '20m',
        //   maxFiles: '14d',
        // }),
        // new DailyRotateFile({
        //   level: 'silly',
        //   filename: 'logs/silly-%DATE%.log',
        //   datePattern: 'YYYY-MM-DD',
        //   zippedArchive: true,
        //   maxSize: '20m',
        //   maxFiles: '14d',
        // }),
      ],
    }),
  ], //
  exports: [WinstonCustomModule],
})
export class WinstonCustomModule {}
