import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class UpdateAnswerInput {
  @Field({ nullable: false })
  nums: number;

  @Field({ nullable: false })
  value: string;
}