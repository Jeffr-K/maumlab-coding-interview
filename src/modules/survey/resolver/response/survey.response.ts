import { Survey } from "../../entity/survey.entity";
import { createUnionType, Field, Int, ObjectType } from "@nestjs/graphql";
import { HttpStatus } from "@nestjs/common";
import { ResponseBaseModel } from "./response";

@ObjectType()
export class SurveyMutationResponse extends ResponseBaseModel {
  @Field(() => Boolean)
  data: boolean;

  constructor(code: number, message: string, data: boolean) {
    super(code, message);
    this.data = data;
  }
}

@ObjectType()
export class SurveyResponse extends ResponseBaseModel {
  @Field(() => Survey)
  data: Survey;
  constructor(code: number, message: string, data: Survey) {
    super(code, message);
    this.data = data;
  }
}

@ObjectType()
export class SurveyQueriesResponse extends ResponseBaseModel {
  @Field(() => [Survey])
  data: Survey[];
  constructor(code: number, message: string, data: Survey[]) {
    super(code, message);
    this.data = data;
  }
}