import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Survey } from "../entity/survey.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Completed } from "../entity/completed";
import { Question } from "../entity/question.entity";
import { Checked } from "../entity/checked";

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey) private readonly surveyRepository: Repository<Survey>,
    @InjectRepository(Question) private readonly questionRepository: Repository<Question>
  ) {}

  async createSurvey(data: { title: string, author: string }) {
    try {
      const survey = new Survey();
      survey.title = data.title;
      survey.author = data.author;

      const isSaved = await this.surveyRepository.save(survey);
      if (!isSaved) {
        throw new BadRequestException("설문지를 찾을 수 없거나, 잘못된 속성을 입력하였습니다.");
      }

      return true;
    } catch (e) {
      throw e;
    }
  }

  async deleteSurvey(data: { id: number }) {
    try {
      const isDeleted = await this.surveyRepository.delete({ id: data.id });
      if (!isDeleted) {
        throw new BadRequestException("설문지를 찾을 수 없거나, 잘못된 속성을 입력하였습니다.");
      }

      return true;
    } catch (e) {
      throw e;
    }
  }

  async editSurvey(data: {
    id: number,
    input: { title: string, author: string }
  }): Promise<boolean> {
    try {
      const isUpdated = await this.surveyRepository.update(data.id, {
        title: data.input.title,
        author: data.input.author
      });
      if (!isUpdated) {
        throw new BadRequestException("설문지를 찾을 수 없거나, 잘못된 속성을 입력하였습니다.");
      }

      return true;
    } catch (e) {
      throw e;
    }
  }

  async getSurvey(data: { surveyId: number }): Promise<Survey> {
    try {
      const result = await this.surveyRepository.findOne({
        where: { id: data.surveyId },
        relations: ['questions', 'questions.answers', 'questions.selectors'],
        select: ['questions'],
      });
      if (!result) {
        throw new NotFoundException("설문지를 찾을 수 없습니다.");
      }

      return result;
    } catch (e) {
      throw e;
    }
  }

  async getSurveys(): Promise<Survey[]> {
    try {
      const result = await this.surveyRepository.find({
        order: { createdAt: 'DESC' }
      });
      if (!result || result.length == 0) {
        throw new NotFoundException("등록된 설문지가 없습니다.");
      }

      return result;
    } catch (e) {
      throw e;
    }
  }
  async saveSurveyCompleted(data: {
    surveyId: number,
    completed: boolean
  }): Promise<boolean> {
    try {
      if (!data.completed) {
        throw new BadRequestException('completed 속성에 `true` 값을 명시해야 합니다.');
      }
      const survey = await this.surveyRepository.findOne({
        where: { id: data.surveyId }
      });
      if (survey.completed === Completed.TRUE) {
        throw new BadRequestException("이미 완료 처리가 된 설문지 입니다.");
      }

      // 검사하자 question.
      const questions = await this.questionRepository.find({
        where: { survey: { id: survey.id }}
      });
      const questionsHasNotChecked = questions
        .filter(question => question.checked === Checked.FALSE)
        .map(notCheckedQuestion => {
          return {
            id: notCheckedQuestion.id,
            title: notCheckedQuestion.title
          }
        });
      if (questionsHasNotChecked.length !== 0) {
        throw new BadRequestException(`아직 체크가 되지 않은 문제 항목이 있습니다. caused ${questionsHasNotChecked}`)
      }

      await this.surveyRepository.update(data.surveyId, {
        completed: Completed.TRUE
      });

      return true;
    } catch (e) {
      throw e;
    }
  }

  async getSurveyCompleted(): Promise<Survey[]> {
    try {
      const surveys = await this.surveyRepository.find({
        where: { completed: Completed.TRUE },
        order: { createdAt: 'DESC' }
      });

      return surveys;
    } catch (e) {
      throw e;
    }
  }
}