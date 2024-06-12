import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExamResultDocument = ExamResult & Document;

@Schema()
export class ExamResult {
  @Prop({ required: true })
  courseId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  result: string[];

  @Prop({ required: true })
  percentage: number;
}

export const ExamResultSchema = SchemaFactory.createForClass(ExamResult);