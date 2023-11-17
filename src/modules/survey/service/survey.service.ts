import { Inject, Injectable, Logger, LoggerService, NotFoundException } from "@nestjs/common";
import { Survey } from "../entity/survey.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SurveyNotFoundException } from "../../../utils/exception/survey.not-found.exception";

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey) private readonly surveyRepository: Repository<Survey>
  ) {}

  async createSurvey(data: { title: string, author: string }) {
    try {
      const survey = new Survey();
      survey.title = data.title;
      survey.author = data.author;

      const isSaved = await this.surveyRepository.save(survey)
      return !!isSaved;
    } catch (e) {
      throw e;
    }
  }

  async deleteSurvey(data: { id: number }) {
    try {
      await this.surveyRepository.delete({ id: data.id });
      return true;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async editSurvey(data: {
    id: number,
    input: { title: string, author: string }}
  ): Promise<boolean> {
    try {
      await this.surveyRepository.update(data.id, {
        title: data.input.title,
        author: data.input.author
      });

      return true;
    } catch (e) {
      console.log(e);
    }
  }

  /**
   *
   * @param data
   * @return Promise<Survey>
   * @description 설문지를 단일 조회합니다.
   * @description variable
   * {
   *   "surveyId": 1
   * }
   * @description gql
   * query Query($surveyId: Int!) {
   *   survey(id: $surveyId) {
   *     author
   *     createdAt
   *     id
   *     title
   *     updatedAt
   *     questions {
   *       hint
   *       id
   *       point
   *       title
   *       answers {
   *         nums
   *         value
   *         id
   *       }
   *     }
   *   }
   * }
   */
  async getSurvey(data: { id: number }): Promise<Survey> {
    try {
      const result = await this.surveyRepository.findOne({
        where: { id: data.id },
        relations: ['questions', 'questions.answers'],
        select: ['questions'],
      });

      if (!result) {
        throw new NotFoundException( "설문지를 찾을 수 없습니다.");
      }

      return result;
    } catch (e) {
      throw e;
    }
  }

  async getSurveys(): Promise<Survey[]> {
    return await this.surveyRepository.find({});
  }

  async getSurveyCompleted() {

  }
}