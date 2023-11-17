import { Injectable } from "@nestjs/common";
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

      const question = await this.questionRepository.findOne({
        where: {
          id: data.questionId,
          survey: { id: survey.id },
        },
        relations: ['survey']
      });

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
      console.log(e);
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
      const question = await this.questionRepository.findOne({
        where: { id: data.questionId }
      });

      await this.answerRepository.delete({ id: data.answerId });

      return true;
    } catch (e) {
      console.log(e);
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

      const question = await this.questionRepository.findOne({
        where: { id: data.questionId }, relations: ['survey']
      });

      await this.answerRepository.update(data.answerId, {
        nums: data.input.nums,
        value: data.input.value,
        question: question.survey
      });

      return true;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getAnswer(data: {
    surveyId: number,
    questionId: number,
    answerId: number
  }) {
    try {
      return await this.answerRepository.findOne({
        where: { id: data.answerId }
      });
    } catch (e) {
      console.log(e);
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

      const question = await this.questionRepository.findOne({
        where: { id: data.questionId, survey: survey }
      });

      return await this.answerRepository.find({
        where: { question: question },
        relations: [
          "question",
          "survey"
        ]
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

}