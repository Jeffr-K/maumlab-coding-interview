import { Entity, PrimaryGeneratedColumn, OneToMany, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Question } from './question.entity';
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Completed } from "./completed";

@Entity()
@ObjectType()
export class Survey {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Field(() => String)
  title: string;

  @Column({
    type: 'enum',
    name: 'completed',
    enum: Completed,
    default: Completed.FALSE
  })
  completed: Completed;

  @Column()
  @Field(() => String)
  author: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Field(() => [Question])
  @OneToMany(() => Question, (question) => question.survey)
  questions: Question[];
}
