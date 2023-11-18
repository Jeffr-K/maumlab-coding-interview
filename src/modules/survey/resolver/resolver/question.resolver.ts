import { HttpStatus, Inject } from "@nestjs/common";
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
import { Information } from "../../../../utils/logger/information.decorator";

@Resolver(of => Question)
export class QuestionResolver {
  constructor(
    @Inject(QuestionService) private questionService: QuestionService
  ) {}

  @Query((returns) => QuestionQueryResponse)
  @Information("설문지 문제 항목을 조회합니다.")
  async getQuestion(
    @Args('surveyId', { name: 'surveyId', type: () => Int }) surveyId: number,
    @Args('questionId', { name: 'questionId', type: () => Int }) questionId: number,
  ) {
    try {
      const result = await this.questionService.getQuestion({
        surveyId: surveyId,
        questionId: questionId
      });

      return new QuestionQueryResponse(
        HttpStatus.OK,
        '설문지 문제 항목을 조회하였습니다.',
        result
      );
    } catch (e) {
      throw e;
    }
  }

  @Query((returns) => QuestionQueriesResponse)
  @Information("설문지 문제 항목 목록을 조회합니다.")
  async getQuestions(
    @Args({ name: 'surveyId', type: () => Int }) surveyId: number,
  ) {
    try {
      const result = await this.questionService.getQuestions({
        surveyId: surveyId
      });
      return new QuestionQueriesResponse(
        HttpStatus.OK,
        '설문지 문제 항목 목록을 조회하였습니다.',
        result
      );
    } catch (e) {
      throw e;
    }
  }

  @Mutation((returns) => QuestionMutationResponse)
  @Information("설문지 문제 항목을 생성합니다.")
  async createQuestion(
    @Args('surveyId', { type: () => Int }) id: number,
    @Args() question: CreateQuestionInput
  ) {
    try {
      const result = await this.questionService.createQuestion({
        surveyId: id,
        question: question
      });

      return new QuestionMutationResponse(
        HttpStatus.OK,
        '설문지 문제 항목을 생성하였습니다.',
        result
      );
    } catch (e) {
      throw e;
    }
  }

  @Mutation((returns) => QuestionMutationResponse)
  @Information("설문지 문제 항목을 삭제합니다.")
  async deleteQuestion(
    @Args({ name: 'surveyId', type: () => Int }) surveyId: number,
    @Args({ name: 'questionId', type: () => Int }) questionId: number,
  ) {
    try {
      const result = await this.questionService.deleteQuestion({
        surveyId: surveyId,
        questionId: questionId
      });

      return new QuestionMutationResponse(
        HttpStatus.OK,
        '설문지 문제 항목을 삭제하였습니다.',
        result
      );
    } catch (e) {
      throw e;
    }
  }

  @Mutation((returns) => QuestionMutationResponse)
  @Information("설문지 문제 항목을 수정합니다.")
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

      return new QuestionMutationResponse(
        HttpStatus.OK,
        '설문지 문제 항목을 수정하였습니다.',
        result
      );
    } catch (e) {
      throw e;
    }
  }

}