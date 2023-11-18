import { HttpStatus, Inject } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Answer } from "../../entity/answer.entity";
import { AnswerService } from "../../service/answer.service";
import { UpdateAnswerInput } from "../input/answer.update-input";
import { AnswerRequest, CreateAnswerInput } from "../input/answer.create-input";
import { AnswerMutationResponse, AnswerQueriesResponse, AnswerQueryResponse } from "../response/answer.response";
import { Information } from "../../../../utils/logger/information.decorator";

@Resolver(of => Answer)
export class AnswerResolver {
  constructor(
    @Inject(AnswerService) private readonly answerService: AnswerService
  ) {}

  @Mutation(returns => AnswerMutationResponse)
  @Information('보기 항목을 생성합니다.')
  async createAnswer(
    @Args({ name: 'surveyId', type: () => Int }) surveyId: number,
    @Args({ name: 'questionId',  type: () => Int }) questionId: number,
    @Args({ name: 'answers', type: () => [AnswerRequest]}) answers: CreateAnswerInput
  ) {
    try {
      const result = await this.answerService.createAnswer({
        surveyId: surveyId,
        questionId: questionId,
        input: answers
      });

    return new AnswerMutationResponse(
      HttpStatus.OK,
      '보기 항목을 생성하였습니다.',
      result
    );
    } catch (e) {
      throw e;
    }

  }

  @Mutation(returns => AnswerMutationResponse)
  @Information('보기 항목을 삭제합니다.')
  async deleteAnswer(
    @Args('surveyId', { type: () => Int }) surveyId: number,
    @Args('questionId', { type: () => Int }) questionId: number,
    @Args('answerId', { type: () => Int }) answerId: number
  ) {
    try {
      const result = await this.answerService.deleteAnswer({
        surveyId: surveyId,
        questionId: questionId,
        answerId: answerId
      });

      return new AnswerMutationResponse(
        HttpStatus.OK,
        '보기 항목을 삭제하였습니다.',
        result
      );
    } catch (e) {
      throw e;
    }
  }

  @Mutation(returns => AnswerMutationResponse)
  @Information('보기 항목을 수정합니다.')
  async editAnswer(
    @Args('surveyId', { type: () => Int }) surveyId: number,
    @Args('questionId', { type: () => Int }) questionId: number,
    @Args('answerId', { type: () => Int }) answerId: number,
    @Args() args: UpdateAnswerInput
  ) {
    try {
      const result = await this.answerService.editAnswer({
        surveyId: surveyId,
        questionId: questionId,
        answerId: answerId,
        input: args
      });

      return new AnswerMutationResponse(
        HttpStatus.OK,
        '보기 항목을 수정하였습니다.',
        result
      );
    } catch (e) {
      throw e;
    }
  }

  @Query(returns => AnswerQueryResponse)
  @Information('보기 항목을 조회합니다.')
  async getAnswer(
    @Args('surveyId', { type: () => Int }) surveyId: number,
    @Args('questionId', { type: () => Int }) questionId: number,
    @Args('answerId', { type: () => Int }) answerId: number
  ) {
    try {
      const result = await this.answerService.getAnswer({
        surveyId: surveyId,
        questionId: questionId,
        answerId: answerId
      });

      return new AnswerQueryResponse(
        HttpStatus.OK,
        '보기 항목을 조회하였습니다.',
        result
      );
    } catch (e) {
      throw e;
    }
  }

  @Query(returns => AnswerQueriesResponse)
  @Information('보기 항목 목록을 조회합니다.')
  async getAnswers(
    @Args('surveyId', { type: () => Int }) surveyId: number,
    @Args('questionId', { type: () => Int }) questionId: number,
  ) {
    try {
      const result = await this.answerService.getAnswers({
        surveyId: surveyId,
        questionId: questionId
      });

      return new AnswerQueriesResponse(
        HttpStatus.OK,
        '보기 항목 목록을 조회하였습니다.',
        result
      );
    } catch (e) {
      throw e;
    }
  }
}