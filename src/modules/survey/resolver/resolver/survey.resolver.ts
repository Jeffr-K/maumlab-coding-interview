import { HttpStatus, Inject, NotFoundException } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Survey } from "../../entity/survey.entity";
import { SurveyService } from "../../service/survey.service";
import { CreateSurveyInput } from "../input/survey.create-input";
import { UpdateSurveyInput } from "../input/survey.update-input";
import { SurveyMutationResponse, SurveyQueriesResponse, SurveyResponse } from "../response/survey.response";
import { SurveyNotFoundException } from "../../../../utils/exception/survey.not-found.exception";
import { ErrorResponse } from "../response/error.response";


@Resolver(of => Survey)
export class SurveyResolver {
  constructor(
    @Inject(SurveyService) private surveyService: SurveyService,
  ) {}

  @Mutation((returns) => SurveyMutationResponse)
  async createSurvey(@Args() args: CreateSurveyInput) {
    const result = await this.surveyService.createSurvey({
      title: args.title,
      author: args.author
    });
    return new SurveyMutationResponse(HttpStatus.OK, '성공', result);

  }

  @Mutation((returns) => SurveyMutationResponse)
  async deleteSurvey(@Args('id', { type: () => Int }) id: number) {
    const result = await this.surveyService.deleteSurvey({ id: id });
    return new SurveyMutationResponse(HttpStatus.OK, '성공', result);
  }

  @Mutation((returns) => SurveyMutationResponse)
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
  async getSurvey(@Args('id', { type: () => Int }) id: number) {
    try {
      const result = await this.surveyService.getSurvey({ id: id });
      return new SurveyResponse(HttpStatus.OK, '성공', result);
    } catch (e) {
      throw e;
    }

  }

  @Query((returns) => SurveyQueriesResponse)
  async getSurveys() {
    const result = await this.surveyService.getSurveys();
    return new SurveyQueriesResponse(HttpStatus.OK, '성공', result);
  }

  // // TODO: 설문지 완료
  // @Mutation((returns) => Response)
  // async saveSurveyCompleted() {
  //
  // }
  //
  // // TODO: 완료된 설문지 조회
  // @Query((returns) => Response)
  // async getSurveyCompleted() {
  //   const result =  await this.surveyService.getSurveyCompleted();
  //   return new Response(HttpStatus.OK, "성공", result);
  // }

}