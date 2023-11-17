import { Module } from '@nestjs/common';
import { SurveyResolver } from "./resolver/resolver/survey.resolver";
import { SurveyService } from "./service/survey.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Survey } from "./entity/survey.entity";
import { Question } from "./entity/question.entity";
import { QuestionResolver } from "./resolver/resolver/question.resolver";
import { QuestionService } from "./service/question.service";
import { SelectorService } from "./service/selector.service";
import { Answer } from "./entity/answer.entity";
import { Selector } from "./entity/selector.entity";
import { AnswerResolver } from "./resolver/resolver/answer.resolver";
import { AnswerService } from "./service/answer.service";
import { SelectorResolver } from "./resolver/resolver/selector.resolver";
import { WinstonLogger } from "nest-winston";

@Module({
  imports: [TypeOrmModule.forFeature([Survey, Question, Answer, Selector])],
  providers: [
    SurveyResolver,
    QuestionResolver,
    SelectorResolver,
    AnswerResolver,
    AnswerService,
    QuestionService,
    SelectorService,
    SurveyService,
  ],
})
export class SurveyModule {}