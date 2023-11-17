import { Catch, ArgumentsHost, ExecutionContext, HttpException, NotFoundException } from "@nestjs/common";
import { GqlContextType, GqlExceptionFilter, GqlExecutionContext } from "@nestjs/graphql";
import { customWinstonLogger } from "../winston/winston";
import { ErrorResponse } from "../../modules/survey/resolver/response/error.response";
import { GraphQLError } from "graphql/error";
import { GraphQLException } from "@nestjs/graphql/dist/exceptions";


@Catch()
export class BusinessGlobalExceptionFilter implements GqlExceptionFilter {
  async catch(exception: any, host: ArgumentsHost): Promise<any> {
    const gqlHost = GqlExecutionContext.create(<ExecutionContext>host);
    const context = gqlHost.getContext();
    const response = host.switchToHttp().getResponse();

    if (exception instanceof HttpException) {
      const code = exception.getStatus();
      let message = exception.getResponse()['message'];
      throw new ErrorResponse(code, message, null);
    }

  }
}
