import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Selector } from "../../entity/selector.entity";
import { HttpStatus, Inject } from "@nestjs/common";
import { SelectorService } from "../../service/selector.service";
import { SelectorMutationResponse, SelectorQueriesResponse, SelectorQueryResponse } from "../response/select.response";

@Resolver(of => Selector)
export class SelectorResolver {
  constructor(
    @Inject(SelectorService) private selectorService: SelectorService
  ) {}

  // 선택하기
  @Mutation((returns) => SelectorMutationResponse)
  async createSelector(
    @Args('surveyId', { type: () => Int }) surveyId: number,
    @Args('questionId', { type: () => Int }) questionId: number,
    @Args('answerId', { type: () => Int }) answerId: number,
  ) {
    const result = await this.selectorService.createSelect({
      surveyId: surveyId,
      answerId: answerId,
      questionId: questionId
    });

    return new SelectorMutationResponse(HttpStatus.OK, '성공', result);
  }

  @Mutation((returns) => SelectorMutationResponse)
  async editSelector(
    @Args('surveyId', { type: () => Int }) surveyId: number,
    @Args('questionId', { type: () => Int }) questionId: number,
    @Args('answerId', { type: () => Int }) answerId: number,
    @Args('selectorId', { type: () => Int }) selectorId: number,
    @Args('selected', { type: () => Int }) selected: number
  ) {
    const result = await this.selectorService.editSelect({
      surveyId: surveyId,
      questionId: questionId,
      answerId: answerId,
      selectorId: selectorId,
      selected: selected
    });

    return new SelectorMutationResponse(HttpStatus.OK, '성공', result);
  }

  @Mutation((returns) => SelectorMutationResponse)
  async deleteSelector(
    @Args('surveyId', { type: () => Int }) surveyId: number,
    @Args('questionId', { type: () => Int }) questionId: number,
    @Args('answerId', { type: () => Int }) answerId: number,
    @Args('selectorId', { type: () => Int }) selectorId: number
  ) {
    const result = await this.selectorService.deleteSelect({
      surveyId: surveyId,
      answerId: answerId,
      questionId: questionId,
      selectorId: selectorId
    });

    return new SelectorMutationResponse(HttpStatus.OK, '성공', result);
  }

  @Query((returns) => SelectorQueryResponse)
  async getSelector(
    @Args('surveyId', { type: () => Int }) surveyId: number,
    @Args('questionId', { type: () => Int }) questionId: number,
    @Args('answerId', { type: () => Int }) answerId: number,
    @Args('selectorId', { type: () => Int }) selectorId: number
  ): Promise<SelectorQueryResponse> {
    const result = await this.selectorService.getSelect({
      surveyId: surveyId,
      questionId: questionId,
      answerId: answerId,
      selectorId: selectorId
    });

    return new SelectorQueryResponse(HttpStatus.OK, '성공', result);
  }

  // ok
  @Query((returns) => SelectorQueriesResponse)
  async getSelectors(
    @Args('surveyId', { type: () => Int }) surveyId: number,
    @Args('questionId', { type: () => Int }) questionId: number,
    @Args('answerId', { type: () => Int }) answerId: number,
  ): Promise<SelectorQueriesResponse> {
    const result = await this.selectorService.getSelects({
      surveyId: surveyId,
      questionId: questionId,
      answerId: answerId
    });

    return new SelectorQueriesResponse(HttpStatus.OK, '성공', result);
  }

}