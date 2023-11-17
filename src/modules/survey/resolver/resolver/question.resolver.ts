import { Controller, HttpStatus, Inject } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Question } from "../../entity/question.entity";
import { CreateQuestionInput } from "../input/question.create-input";
import { QuestionService } from "../../service/question.service";
import { UpdateQuestionInput } from "../input/question.update-input";
import {
  QuestionMutationResponse,
  QuestionQueriesResponse,
  QuestionQueryResponse
} from "../response/question.response";

@Resolver(of => Question)
export class QuestionResolver {
  constructor(
    @Inject(QuestionService) private questionService: QuestionService
  ) {}

  // OK
  @Query((returns) => QuestionQueryResponse)
  async getQuestion(
    @Args('surveyId', { name: 'surveyId', type: () => Int }) surveyId: number,
    @Args('questionId', { name: 'questionId', type: () => Int }) questionId: number,
  ) {
    try {
      const result = await this.questionService.getQuestion({
        surveyId: surveyId,
        questionId: questionId
      });

      return new QuestionQueryResponse(HttpStatus.OK, '성공', result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }


  // OK
  @Query((returns) => QuestionQueriesResponse)
  async getQuestions(
    @Args({ name: 'surveyId', type: () => Int }) surveyId: number,
  ) {
    try {
      const result = await this.questionService.getQuestions({});
      return new QuestionQueriesResponse(HttpStatus.OK, '성공', result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  // OK
  @Mutation((returns) => QuestionMutationResponse)
  async createQuestion(
    @Args('surveyId', { type: () => Int }) id: number,
    @Args() question: CreateQuestionInput
  ) {
    try {
      const result = await this.questionService.createQuestion({
        surveyId: id,
        question: question
      });

      return new QuestionMutationResponse(HttpStatus.OK, '성공', result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  // OK
  @Mutation((returns) => QuestionMutationResponse)
  async deleteQuestion(
    @Args({ name: 'surveyId', type: () => Int }) surveyId: number,
    @Args({ name: 'questionId', type: () => Int }) questionId: number,
  ) {
    try {
      const result = await this.questionService.deleteQuestion({
        surveyId: surveyId,
        questionId: questionId
      });

      return new QuestionMutationResponse(HttpStatus.OK, '성공', result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  // OK
  @Mutation((returns) => QuestionMutationResponse)
  async editQuestion(
    @Args({ name: 'surveyId', type: () => Int }) surveyId: number,
    @Args({ name: 'questionId', type: () => Int }) questionId: number,
    @Args() args: UpdateQuestionInput
  ) {
    try {
      const result = await this.questionService.editQuestion({
        surveyId: surveyId,
        questionId: questionId,
        input: args
      });

      return new QuestionMutationResponse(HttpStatus.OK, '성공', result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

}