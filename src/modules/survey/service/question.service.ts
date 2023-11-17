import { Injectable } from "@nestjs/common";
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

      const question = new Question();
      question.title = data.question.title;
      question.hint = data.question.hint;
      question.point = data.question.point;
      question.survey = survey;

      await this.questionRepository.save(question);

      return true;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  // OK
  async deleteQuestion(data: { surveyId: number, questionId: number }) {
    try {
      const survey = await this.surveyRepository.findOne({
        where: { id: data.surveyId }
      });

      console.log('??', survey);

      await this.questionRepository.delete({
        id: data.questionId,
      });

      return true;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  // OK
  async editQuestion(data: {
    surveyId: number,
    questionId: number,
    input: UpdateQuestionInput
  }) {
    try {
      await this.questionRepository.update(data.questionId, {
        title: data.input.title,
        hint: data.input.hint
      });

      return true;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getQuestion(data: { surveyId: number, questionId: number }) {
    try {
      return await this.questionRepository.findOne({
        where: { id: data.questionId },
        relations: ['survey']
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getQuestions(data: {}) {
    try {
      // relation 여부 파악
      return await this.questionRepository.find({
        relations: ['survey']
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}