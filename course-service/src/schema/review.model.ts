// review.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  courseId: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  text: string;

  @Prop({ default: Date.now })
  date: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
