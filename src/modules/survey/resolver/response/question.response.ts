import { ResponseBaseModel } from "./response";
import { Field, ObjectType } from "@nestjs/graphql";
import { Question } from "../../entity/question.entity";

@ObjectType()
export class QuestionMutationResponse extends ResponseBaseModel {
  @Field(() => Boolean)
  data: boolean;

  constructor(code: number, message: string, data: boolean) {
    super(code, message);
    this.data = data;
  }
}

@ObjectType()
export class QuestionQueryResponse extends ResponseBaseModel {
  @Field(() => Question)
  data: Question;

  constructor(code: number, message: string, data: Question) {
    super(code, message);
    this.data = data;
  }
}

@ObjectType()
export class QuestionQueriesResponse extends ResponseBaseModel {
  @Field(() => [Question])
  data: Question[];

  constructor(code: number, message: string, data: Question[]) {
    super(code, message);
    this.data = data;
  }
}