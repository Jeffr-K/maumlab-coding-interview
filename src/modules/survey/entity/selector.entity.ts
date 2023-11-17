import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Question } from './question.entity';
import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Answer } from "./answer.entity";

@Entity()
@ObjectType()
export class Selector {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field(() => Int)
  selected: number;

  @Column()
  @Field(() => Int)
  point: number;

  @ManyToOne(() => Question, (question) => question.selectors)
  question: Question;

  @Field(() => Answer)
  @ManyToOne(() => Answer, (answer) => answer.selector)
  answer: Answer;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}