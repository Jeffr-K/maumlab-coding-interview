import { HttpStatus, Inject } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Answer } from "../../entity/answer.entity";
import { AnswerService } from "../../service/answer.service";
import { UpdateAnswerInput } from "../input/answer.update-input";
import { AnswerRequest, CreateAnswerInput } from "../input/answer.create-input";
import { AnswerMutationResponse, AnswerQueriesResponse, AnswerQueryResponse } from "../response/answer.response";

@Resolver(of => Answer)
export class AnswerResolver {
  constructor(
    @Inject(AnswerService) private readonly answerService: AnswerService
  ) {}

  @Mutation(returns => AnswerMutationResponse)
  async createAnswer(
    @Args({ name: 'surveyId', type: () => Int }) surveyId: number,
    @Args({ name: 'questionId',  type: () => Int }) questionId: number,
    @Args({ name: 'answers', type: () => [AnswerRequest]}) answers: CreateAnswerInput
  ) {
    const result = await this.answerService.createAnswer({
      surveyId: surveyId,
      questionId: questionId,
      input: answers
    });

    return new AnswerMutationResponse(HttpStatus.OK, '성공', result);
  }

  @Mutation(returns => AnswerMutationResponse)
  async deleteAnswer(
    @Args('surveyId', { type: () => Int }) surveyId: number,
    @Args('questionId', { type: () => Int }) questionId: number,
    @Args('answerId', { type: () => Int }) answerId: number
  ) {
    const result = await this.answerService.deleteAnswer({
      surveyId: surveyId,
      questionId: questionId,
      answerId: answerId
    });

    return new AnswerMutationResponse(HttpStatus.OK, '성공', result);
  }

  @Mutation(returns => AnswerMutationResponse)
  async editAnswer(
    @Args('surveyId', { type: () => Int }) surveyId: number,
    @Args('questionId', { type: () => Int }) questionId: number,
    @Args('answerId', { type: () => Int }) answerId: number,
    @Args() args: UpdateAnswerInput
  ) {
    const result = await this.answerService.editAnswer({
      surveyId: surveyId,
      questionId: questionId,
      answerId: answerId,
      input: args
    });

    return new AnswerMutationResponse(HttpStatus.OK, '성공', result);
  }

  @Query(returns => AnswerQueryResponse)
  async getAnswer(
    @Args('surveyId', { type: () => Int }) surveyId: number,
    @Args('questionId', { type: () => Int }) questionId: number,
    @Args('answerId', { type: () => Int }) answerId: number
  ) {
    const result = await this.answerService.getAnswer({
      surveyId: surveyId,
      questionId: questionId,
      answerId: answerId
    });

    return new AnswerQueryResponse(HttpStatus.OK, '성공', result);
  }

  @Query(returns => AnswerQueriesResponse)
  async getAnswers(
    @Args('surveyId', { type: () => Int }) surveyId: number,
    @Args('questionId', { type: () => Int }) questionId: number,
  ) {
    const result = await this.answerService.getAnswers({
      surveyId: surveyId,
      questionId: questionId
    });

    return new AnswerQueriesResponse(HttpStatus.OK, '성공', result);
  }
}