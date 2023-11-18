import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Question } from "./question.entity";
import { Selector } from "./selector.entity";

@Entity()
@ObjectType()
export class Answer {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column({ nullable: false })
  nums: number;

  @Field(() => String)
  @Column({ nullable: false })
  value: string;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;

  @OneToMany(() => Selector, (selector) => selector.question)
  selector: Selector[];
}
