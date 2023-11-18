import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Selector } from "../entity/selector.entity";
import { Repository } from "typeorm";
import { Question } from "../entity/question.entity";
import { Answer } from "../entity/answer.entity";
import { Survey } from "../entity/survey.entity";
import { Checked } from "../entity/checked";

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
      await this.questionRepository.update(question.id, {
        checked: Checked.TRUE
      });

      return true;
    } catch (e) {
      throw e;
    }
  }

  async deleteSelect(data: {
    surveyId: number,
    answerId: number,
    questionId: number
    selectorId: number
  }): Promise<boolean> {
    try {
      const survey = await this.surveyRepository.findOne({
        where: { id: data.surveyId },
      });
      if (!survey) {
        throw new NotFoundException("설문지를 찾을 수 없습니다.");
      }

      const question = await this.questionRepository.findOne({
        where: { id: data.questionId },
      });
      if (!question) {
        throw new NotFoundException("문제 항목을 찾을 수 없습니다.");
      }

      const answer = await this.answerRepository.findOne({
        where: { id: data.answerId, question: question }
      });
      if (!answer) {
        throw new NotFoundException("보기 항목을 찾을 수 없습니다.");
      }

      const selected = await this.selectorRepository.findOne({ where: { id: data.selectorId }});
      if (!selected) {
        throw new NotFoundException("삭제할 선택한 보기 항목이 없습니다.");
      }

      await this.selectorRepository.delete({
        id: selected.id,
        answer: { id: answer.id },
        question: { id: question.id }
      });
      await this.questionRepository.update(question.id, {
        checked: Checked.FALSE
      });

      return true;
    } catch (e) {
      throw e;
    }
  }

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
      if (!survey) {
        throw new NotFoundException("설문지를 찾을 수 없습니다.");
      }

      const question = await this.questionRepository.findOne({
        where: { id: data.questionId },
      });
      if (!question) {
        throw new NotFoundException("문제 항목을 찾을 수 없습니다.");
      }

      const answer = await this.answerRepository.findOne({
        where: { id: data.answerId }
      });
      if (!answer) {
        throw new NotFoundException("보기 항목을 찾을 수 없습니다.");
      }

      await this.selectorRepository.update(data.selectorId, {
        selected: data.selected
      });

      return true;
    } catch (e) {
      throw e;
    }
  }

  async getSelect(data: {
    surveyId: number,
    questionId: number,
    answerId: number,
    selectorId: number,
  }): Promise<Selector> {
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

      const answer = await this.questionRepository.findOne({
        where: { id: data.answerId }
      });
      if (!answer) {
        throw new NotFoundException("보기 항목을 찾을 수 없습니다.");
      }

      const selected = await this.selectorRepository.findOne({ where: { id: data.selectorId }});
      if (!selected) {
        throw new NotFoundException("선택한 보기 항목이 존재하지 않습니다.")
      }

      return await this.selectorRepository.findOne({
        where: {
          id: selected.id,
          answer: { id: answer.id },
          question: { id: question.id }
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async getSelects(data: {
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

      const answer = await this.questionRepository.findOne({
        where: { id: data.answerId }
      });
      if (!answer) {
        throw new NotFoundException("보기 항목을 찾을 수 없습니다.");
      }

      const result = await this.selectorRepository.find({
        where: {
          question: { id: question.id },
          answer: { id: answer.id }
        },
        relations: ['answer']
      });
      if (result.length === 0) {
        throw new NotFoundException("설문지에 조회가능 한 선택된 항목이 없습니다.");
      }

      return result;
    } catch (e) {
      throw e;
    }
  }

}