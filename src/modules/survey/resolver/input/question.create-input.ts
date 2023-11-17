import { ArgsType, Field } from "@nestjs/graphql";


@ArgsType()
export class CreateQuestionInput {
  @Field({ nullable: false })
  title: string;

  @Field({ nullable: true })
  hint?: string;

  @Field({ nullable: false })
  point: number;
}