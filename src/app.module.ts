import { Logger, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { SurveyModule } from "./modules/survey/survey.module";
import { HealthcheckResolver } from "./healthcheck.resolver";
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { LoggerMiddleware } from "./utils/winston/winston.middleware";
import { config } from 'dotenv';
import { BusinessGlobalExceptionFilter } from "./utils/exception/global.exception.filter";
import { APP_FILTER } from "@nestjs/core";
import { ErrorResponse } from "./modules/survey/resolver/response/error.response";
import { unwrapResolverError } from '@apollo/server/errors';
config();


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault({})],
      formatError: (err) => {
        return ({ message: err.message, status: err.extensions.code })
      },
      // formatError: (err) => {
      //   const transformer = new ErrorResponse(err.extensions.code, err.message, null);
      //   return transformer.transform();
      // }
    }),
    SurveyModule,
  ],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer): any {
  //   // consumer.apply(LoggerMiddleware).forRoutes('*');
  // }

}
