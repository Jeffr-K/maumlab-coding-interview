import { Field, Int, ObjectType } from "@nestjs/graphql";
import { HttpStatus } from "@nestjs/common";

@ObjectType()
export class ResponseBaseModel {
  @Field(() => Int)
  code: HttpStatus;
  @Field(() => String)
  message: string;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }
}