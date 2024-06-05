// src/category/schemas/category.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Enrollment extends Document {
  @Prop({ required: true})
  userId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Course' })
  courseId:  MongooseSchema.Types.ObjectId;

  @Prop({ default: Date.now })
  enrolledAt: Date;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);
