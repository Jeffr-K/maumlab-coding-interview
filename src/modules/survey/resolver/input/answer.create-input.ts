import { ArgsType, Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class AnswerRequest {
  @Field(type => Int)
  nums: number;
  @Field(type => String)
  value: string;
}

@InputType()
export class CreateAnswerInput {
  @Field(type => [AnswerRequest])
  answers: AnswerRequest[];
}