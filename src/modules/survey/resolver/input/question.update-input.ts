import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class UpdateQuestionInput {
  @Field({ nullable: false })
  title: string;

  @Field({ nullable: true })
  hint?: string;
}