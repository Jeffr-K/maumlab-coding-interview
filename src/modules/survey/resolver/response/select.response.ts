import { ResponseBaseModel } from "./response";
import { Field, ObjectType } from "@nestjs/graphql";
import { Selector } from "../../entity/selector.entity";

@ObjectType()
export class SelectorMutationResponse extends ResponseBaseModel {
  @Field(() => Boolean)
  data: boolean;

  constructor(code: number, message: string, data: boolean) {
    super(code, message);
    this.data = data;
  }
}

@ObjectType()
export class SelectorQueryResponse extends ResponseBaseModel {
  @Field(() => Selector)
  data: Selector;

  constructor(code: number, message: string, data: Selector) {
    super(code, message);
    this.data = data;
  }
}

@ObjectType()
export class SelectorQueriesResponse extends ResponseBaseModel {
  @Field(() => [Selector])
  data: Selector[];

  constructor(code: number, message: string, data: Selector[]) {
    super(code, message);
    this.data = data;
  }
}