import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { SurveyModule } from "./modules/survey/survey.module";
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { config } from 'dotenv';
import { WinstonCustomModule } from "./utils/winston/winston.custom.module";
import { AopModule } from "@toss/nestjs-aop";
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
    }),
    SurveyModule,
    AopModule
  ],
})
export class AppModule {}
