import { ResponseBaseModel } from "./response";
import { Field } from "@nestjs/graphql";
import { HttpException, HttpStatus } from "@nestjs/common";
import { GraphQLFormattedError, SourceLocation } from "graphql/index";

export class ErrorResponse extends ResponseBaseModel {
  @Field(() => Error)
  data: any;

  constructor(code: any, message: any, data: any) {
    super(code, message);
    this.data = data;
  }

}