import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class UpdateSurveyInput {
  @Field({ nullable: false })
  title: string;

  @Field({ nullable: true })
  author: string;
}