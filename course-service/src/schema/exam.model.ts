import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Question extends Document {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  correctOption: string;

  @Prop({ type: Map, of: String })
  options: Record<string, string>;
}

const QuestionSchema = SchemaFactory.createForClass(Question);

@Schema()
export class Exam extends Document {
  @Prop({ required: true })
  courseId: string;

  @Prop({ type: [QuestionSchema], required: true })
  exams: Question[];
}

const ExamSchema = SchemaFactory.createForClass(Exam);

export { ExamSchema, QuestionSchema };
