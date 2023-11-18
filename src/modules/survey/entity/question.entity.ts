import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Survey } from './survey.entity';
import { Selector } from './selector.entity';
import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Answer } from "./answer.entity";
import { Checked } from "./checked";

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

  @Column({
    type: 'enum',
    name: 'checked',
    enum: Checked,
    default: Checked.FALSE
  })
  checked: Checked;

  @ManyToOne(() => Survey, (survey) => survey.questions)
  survey: Survey;

  @Field(() => [Answer])
  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @Field(() => [Selector])
  @OneToMany(() => Selector, (selector) => selector.question)
  selectors: Selector[];
}