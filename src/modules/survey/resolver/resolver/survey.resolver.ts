import { HttpStatus, Inject } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Survey } from "../../entity/survey.entity";
import { SurveyService } from "../../service/survey.service";
import { CreateSurveyInput } from "../input/survey.create-input";
import { UpdateSurveyInput } from "../input/survey.update-input";
import { SurveyMutationResponse, SurveyQueriesResponse, SurveyResponse } from "../response/survey.response";
import { Information } from "../../../../utils/logger/information.decorator";


@Resolver(of => Survey)
export class SurveyResolver {
  constructor(
    @Inject(SurveyService) private surveyService: SurveyService,
  ) {}

  @Mutation((returns) => SurveyMutationResponse)
  @Information("설문지를 생성합니다.")
  async createSurvey(@Args() args: CreateSurveyInput) {
    const result = await this.surveyService.createSurvey({
      title: args.title,
      author: args.author
    });
    return new SurveyMutationResponse(HttpStatus.OK, '성공', result);

  }

  @Mutation((returns) => SurveyMutationResponse)
  @Information("설문지를 삭제합니다.")
  async deleteSurvey(@Args('id', { type: () => Int }) id: number) {
    const result = await this.surveyService.deleteSurvey({ id: id });
    return new SurveyMutationResponse(HttpStatus.OK, '성공', result);
  }

  @Mutation((returns) => SurveyMutationResponse)
  @Information("설문지를 수정합니다.")
  async editSurvey(
    @Args('id', { type: () => Int }) id: number,
    @Args() args: UpdateSurveyInput
  ) {
    const result = await this.surveyService.editSurvey({
      id: id,
      input: args
    });
    return new SurveyMutationResponse(HttpStatus.OK, '성공', result);
  }

  @Query((returns) => SurveyResponse)
  @Information('설문지를 조회합니다.')
  async getSurvey(@Args('surveyId', { type: () => Int }) surveyId: number) {
    try {
      const result = await this.surveyService.getSurvey({ surveyId: surveyId });
      return new SurveyResponse(HttpStatus.OK, '성공', result);
    } catch (e) {
      throw e;
    }
  }

  @Query((returns) => SurveyQueriesResponse)
  @Information("설문지 목록을 조회합니다.")
  async getSurveys() {
    try {
      const result = await this.surveyService.getSurveys();
      return new SurveyQueriesResponse(HttpStatus.OK, '성공', result);
    } catch (e) {
      throw e;
    }
  }

  @Mutation((returns) => SurveyMutationResponse)
  @Information('설문지를 완료합니다.')
  async saveSurveyCompleted(
    @Args('surveyId', { type: () => Int }) surveyId: number
  ) {
    try {
      const result = await this.surveyService.saveSurveyCompleted({
        surveyId: surveyId,
        completed: true
      });
      return new SurveyMutationResponse(HttpStatus.OK, '설문지가 완료 처리 되었습니다.', result);
    } catch (e) {
      throw e;
    }
  }

  @Query((returns) => SurveyQueriesResponse)
  @Information("완료된 설문지를 조회합니다.")
  async getSurveyCompleted() {
    const result =  await this.surveyService.getSurveyCompleted();
    return new SurveyQueriesResponse(HttpStatus.OK, "성공", result);
  }

}