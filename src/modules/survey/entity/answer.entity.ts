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

  // @Field(() => Question)
  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;

  // @Field(() => [Selector])
  @OneToMany(() => Selector, (selector) => selector.question)
  selector: Selector[];
}
