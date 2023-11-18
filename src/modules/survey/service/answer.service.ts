import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Answer } from "../entity/answer.entity";
import { AnswerRequest } from "../resolver/input/answer.create-input";
import { Survey } from "../entity/survey.entity";
import { Question } from "../entity/question.entity";
import { UpdateAnswerInput } from "../resolver/input/answer.update-input";
import { info } from "winston";

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Survey) private readonly surveyRepository: Repository<Survey>,
    @InjectRepository(Question) private readonly questionRepository: Repository<Question>,
    @InjectRepository(Answer) private readonly answerRepository: Repository<Answer>
  ) {}

  async createAnswer(data: {
    surveyId: number,
    questionId: number,
    input: any
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

      await Promise.all(
        data.input.map(async(answer: AnswerRequest) => {
          const newAnswer = new Answer();
          newAnswer.nums = answer.nums;
          newAnswer.value = answer.value;
          newAnswer.question = question;
          await this.answerRepository.save(newAnswer);
        })
      );

      return true;
    } catch (e) {
      throw e;
    }
  }

  async deleteAnswer(data: {
    surveyId: number,
    questionId: number,
    answerId: number
  }) {
    try {
      const survey = await this.surveyRepository.findOne({
        where: { id: data.surveyId }
      });
      if (!survey) {
        throw new NotFoundException("설문지를 찾을 수 없습니다.");
      }
      const question = await this.questionRepository.findOne({
        where: { id: data.questionId }
      });
      if (!question) {
        throw new NotFoundException("문제 항목을 찾을 수 없습니다.");
      }

      await this.answerRepository.delete({ id: data.answerId });

      return true;
    } catch (e) {
      throw e;
    }
  }

  async editAnswer(data: {
    surveyId: number,
    questionId: number,
    answerId: number,
    input: UpdateAnswerInput
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

      await this.answerRepository.update(data.answerId, {
        nums: data.input.nums,
        value: data.input.value,
        question: { id: question.id }
      });

      return true;
    } catch (e) {
      throw e;
    }
  }

  async getAnswer(data: {
    surveyId: number,
    questionId: number,
    answerId: number
  }) {
    try {
      const survey = await this.surveyRepository.findOne({
        where: { id: data.surveyId }
      });
      if (!survey) {
        throw new NotFoundException("설문지를 찾을 수 없습니다.");
      }

      const question = await this.questionRepository.findOne({
        where: { id: data.questionId }
      });
      if (!question) {
        throw new NotFoundException("문제 항목을 찾을 수 없습니다.");
      }

      const result = await this.answerRepository.findOne({
        where: { id: data.answerId }
      });
      if (!result) {
        throw new NotFoundException("입력값이 잘못되었거나 조회하고자 하는 데이터가 없습니다.");
      }

      return result;
    } catch (e) {
      throw e;
    }
  }

  async getAnswers(data: {
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
        where: { id: data.questionId }
      });
      if (!question) {
        throw new NotFoundException("문제 항목을 찾을 수 없습니다.");
      }

      const result =  await this.answerRepository.find({
        where: { question: { id: question.id } },
        relations: ["question"]
      });
      if (result.length === 0) {
        throw new NotFoundException("설문지에 조회가능 한 보기 항목이 없습니다.");
      }

      return result;
    } catch (e) {
      throw e;
    }
  }

}