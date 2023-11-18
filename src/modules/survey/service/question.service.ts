import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Question } from "../entity/question.entity";
import { Repository } from "typeorm";
import { CreateQuestionInput } from "../resolver/input/question.create-input";
import { Survey } from "../entity/survey.entity";
import { UpdateQuestionInput } from "../resolver/input/question.update-input";

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Survey) private readonly surveyRepository: Repository<Survey>,
    @InjectRepository(Question) private readonly questionRepository: Repository<Question>
  ) {}

  async createQuestion(data: {
    surveyId: number,
    question: CreateQuestionInput
  }) {
    try {
      const survey = await this.surveyRepository.findOne({
        where: { id: data.surveyId }
      });
      if (!survey) {
        throw new NotFoundException("설문지를 찾을 수 없습니다.");
      }

      const question = new Question();
      question.title = data.question.title;
      question.hint = data.question.hint;
      question.point = data.question.point;
      question.survey = survey;

      await this.questionRepository.save(question);

      return true;
    } catch (e) {
      throw e;
    }
  }

  async deleteQuestion(data: {
    surveyId: number,
    questionId: number
  }) {
    try {
      const survey = await this.surveyRepository.findOne({
        where: { id: data.surveyId }
      });
      if (!survey) {
        throw new NotFoundException("설문지를 찾을 수 없습니다.");
      }
      const question = await this.questionRepository.findOne({
        where: { id: data.questionId }, relations: ['survey']
      });
      if (!question) {
        throw new NotFoundException("문제 항목을 찾을 수 없습니다.");
      }

      await this.questionRepository.delete({
        id: data.questionId,
      });

      return true;
    } catch (e) {
      throw e;
    }
  }

  async editQuestion(data: {
    surveyId: number,
    questionId: number,
    input: UpdateQuestionInput
  }) {
    try {
      const survey = await this.surveyRepository.findOne({
        where: { id: data.surveyId }
      });
      if (!survey) {
        throw new NotFoundException("설문지를 찾을 수 없습니다.");
      }

      const question = await this.questionRepository.findOne({
        where: {
          id: data.questionId,
          survey: { id: survey.id },
        },
        relations: ['survey']
      });
      if (!question) {
        throw new NotFoundException("문제 항목을 찾을 수 없습니다.");
      }

      await this.questionRepository.update(data.questionId, {
        title: data.input.title,
        hint: data.input.hint
      });

      return true;
    } catch (e) {
      throw e;
    }
  }

  async getQuestion(data: { surveyId: number, questionId: number }) {
    try {
      const survey = await this.surveyRepository.findOne({
        where: { id: data.surveyId }
      });
      if (!survey) {
        throw new NotFoundException("설문지를 찾을 수 없습니다.");
      }

      return await this.questionRepository.findOne({
        where: { id: data.questionId },
        relations: ['survey']
      });
    } catch (e) {
      throw e;
    }
  }

  async getQuestions(data: {
    surveyId: number;
  }) {
    try {
      const survey = await this.surveyRepository.findOne({
        where: { id: data.surveyId }
      });
      if (!survey) {
        throw new NotFoundException("설문지를 찾을 수 없습니다.");
      }

      const result = await this.questionRepository.find({
        where: { survey: { id: survey.id } },
        relations: ['survey']
      });
      if (result.length === 0) {
        throw new NotFoundException("설문지에 조회가능 한 문제 항목이 없습니다.");
      }

      return result;
    } catch (e) {
      throw e;
    }
  }
}