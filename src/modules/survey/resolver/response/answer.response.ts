import { ResponseBaseModel } from "./response";
import { Field, ObjectType } from "@nestjs/graphql";
import { Answer } from "../../entity/answer.entity";

@ObjectType()
export class AnswerMutationResponse extends ResponseBaseModel {
  @Field(() => Boolean)
  data: boolean;

  constructor(code: number, message: string, data: boolean) {
    super(code, message);
    this.data = data;
  }
}

@ObjectType()
export class AnswerQueryResponse extends ResponseBaseModel {
  @Field(() => Answer)
  data: Answer;

  constructor(code: number, message: string, data: Answer) {
    super(code, message);
    this.data = data;
  }
}

@ObjectType()
export class AnswerQueriesResponse extends ResponseBaseModel {
  @Field(() => [Answer])
  data: Answer[];

  constructor(code: number, message: string, data: Answer[]) {
    super(code, message);
    this.data = data;
  }
}