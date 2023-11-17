import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Survey } from './survey.entity';
import { Selector } from './selector.entity';
import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Answer } from "./answer.entity";

@Entity()
@ObjectType()
export class Question {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field(() => String)
  title: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  hint?: string | null;

  @Column({ nullable: false })
  @Field(() => Int, { nullable: true })
  point: number;

  @Field((type) => Survey)
  @ManyToOne(() => Survey, (survey) => survey.questions)
  survey: Survey;

  @Field(() => [Answer])
  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @Field(() => [Selector])
  @OneToMany(() => Selector, (selector) => selector.question)
  selectors: Selector[];
}