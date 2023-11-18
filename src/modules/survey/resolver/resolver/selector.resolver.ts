import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Selector } from "../../entity/selector.entity";
import { HttpStatus, Inject } from "@nestjs/common";
import { SelectorService } from "../../service/selector.service";
import { SelectorMutationResponse, SelectorQueriesResponse, SelectorQueryResponse } from "../response/select.response";
import { Information } from "../../../../utils/logger/information.decorator";

@Resolver(of => Selector)
export class SelectorResolver {
  constructor(
    @Inject(SelectorService) private selectorService: SelectorService
  ) {}

  @Mutation((returns) => SelectorMutationResponse)
  @Information("문제 항목을 선택합니다.")
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

    return new SelectorMutationResponse(
      HttpStatus.OK,
      '문제 항목을 선택하였습니다.',
      result
    );
  }

  @Mutation((returns) => SelectorMutationResponse)
  @Information("선택한 문제 항목을 수정합니다.")
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

    return new SelectorMutationResponse(
      HttpStatus.OK,
      '선택한 문제 항목을 수정하였습니다.',
      result
    );
  }

  @Mutation((returns) => SelectorMutationResponse)
  @Information("문제 항목의 선택을 취소하였습니다.")
  async deleteSelector(
    @Args('surveyId', { type: () => Int }) surveyId: number,
    @Args('questionId', { type: () => Int }) questionId: number,
    @Args('answerId', { type: () => Int }) answerId: number,
    @Args('selectorId', { type: () => Int }) selectorId: number
  ) {
    try {
      const result = await this.selectorService.deleteSelect({
        surveyId: surveyId,
        answerId: answerId,
        questionId: questionId,
        selectorId: selectorId
      });

      return new SelectorMutationResponse(
        HttpStatus.OK,
        '문제 항목의 선택을 취소하였습니다.',
        result
      );
    } catch (e) {
      throw e;
    }
  }

  @Query((returns) => SelectorQueryResponse)
  @Information("문제 항목을 조회합니다.")
  async getSelector(
    @Args('surveyId', { type: () => Int }) surveyId: number,
    @Args('questionId', { type: () => Int }) questionId: number,
    @Args('answerId', { type: () => Int }) answerId: number,
    @Args('selectorId', { type: () => Int }) selectorId: number
  ): Promise<SelectorQueryResponse> {
    try {
      const result = await this.selectorService.getSelect({
        surveyId: surveyId,
        questionId: questionId,
        answerId: answerId,
        selectorId: selectorId
      });

      return new SelectorQueryResponse(
        HttpStatus.OK,
        '문제 항목을 조회하였습니다.',
        result
      );
    } catch (e) {
      throw e;
    }
  }

  @Query((returns) => SelectorQueriesResponse)
  @Information("문제 항목 목록을 조회합니다.")
  async getSelectors(
    @Args('surveyId', { type: () => Int }) surveyId: number,
    @Args('questionId', { type: () => Int }) questionId: number,
    @Args('answerId', { type: () => Int }) answerId: number,
  ): Promise<SelectorQueriesResponse> {
    try {
      const result = await this.selectorService.getSelects({
        surveyId: surveyId,
        questionId: questionId,
        answerId: answerId
      });

      return new SelectorQueriesResponse(
        HttpStatus.OK,
        '문제 항목 목록을 조회하였습니다.',
        result
      );
    } catch (e) {
      throw e;
    }
  }

}