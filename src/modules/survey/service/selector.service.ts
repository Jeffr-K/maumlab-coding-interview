import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Selector } from "../entity/selector.entity";
import { Repository } from "typeorm";
import { Question } from "../entity/question.entity";
import { Answer } from "../entity/answer.entity";
import { Survey } from "../entity/survey.entity";

@Injectable()
export class SelectorService {
  constructor(
    @InjectRepository(Survey) private readonly surveyRepository: Repository<Survey>,
    @InjectRepository(Question) private readonly questionRepository: Repository<Question>,
    @InjectRepository(Answer) private readonly answerRepository: Repository<Answer>,
    @InjectRepository(Selector) private readonly selectorRepository: Repository<Selector>
  ) {}

  async createSelect(data: {
    surveyId: number,
    answerId: number,
    questionId: number
  }) {
    try {
      const survey = await this.surveyRepository.findOne({
        where: { id: data.surveyId }
      });
      const question = await this.questionRepository.findOne({
        where: { id: data.questionId }
      });
      const answer = await this.answerRepository.findOne({
        where: { id: data.answerId }
      });

      const selector = new Selector();
      selector.question = question;
      selector.answer = answer;
      selector.selected = answer.nums;
      selector.point = question.point;

      await this.selectorRepository.save(selector);

      return true;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  // ok
  async deleteSelect(data: {
    surveyId: number,
    answerId: number,
    questionId: number
    selectorId: number
  }): Promise<boolean> {
    try {
      const survey = await this.surveyRepository.findOne({
        where: { id: data.surveyId }
      });
      const question = await this.questionRepository.findOne({
        where: { id: data.questionId }
      });
      const answer = await this.answerRepository.findOne({
        where: { id: data.answerId }
      });

      await this.selectorRepository.delete({
        id: data.selectorId
      });

      return true;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  // ok
  async editSelect(data: {
    surveyId: number,
    questionId: number,
    answerId: number,
    selectorId: number,
    selected: number
  }): Promise<boolean> {
    try {
      const survey = await this.surveyRepository.findOne({
        where: { id: data.surveyId },
      });

      const question = await this.questionRepository.findOne({
        where: { id: data.questionId },
      });

      const answer = await this.answerRepository.findOne({
        where: { id: data.answerId, question: question }
      }).catch(e => new Error("ddd"));

      await this.selectorRepository.update(data.selectorId, {
        selected: data.selected
      });

      return true;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  // ok
  async getSelect(data: {
    surveyId: number,
    questionId: number,
    answerId: number,
    selectorId: number,
  }): Promise<Selector> {
    try {
      const result = await this.selectorRepository.findOne({
        where: { id: data.selectorId },
        relations: ['answer']
      });

      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  // TODO:
  async getSelects(data: {
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
      const answer = await this.questionRepository.findOne({
        where: { id: data.answerId }
      });

      return await this.selectorRepository.find({
        where: {
          question: question,
          answer: answer
        },
        relations: ['answer']
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

}