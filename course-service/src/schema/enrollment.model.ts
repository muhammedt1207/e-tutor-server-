import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Course } from './course.model';

@Schema()
export class Enrollment extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true ,ref:"User" })
  userId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true ,ref:"Course"})
  courseId: MongooseSchema.Types.ObjectId;

  @Prop({ default: Date.now })
  enrolledAt: Date;

  @Prop({
    type: {
      completedLessons: { type: [{ lessonId: MongooseSchema.Types.ObjectId, subLessonId: MongooseSchema.Types.ObjectId }], default: [] },
      currentLesson: { type: MongooseSchema.Types.ObjectId, default: null },
      currentSubLesson: { type: MongooseSchema.Types.ObjectId, default: null },
      totalTimeWatched: { type: Number, default: 0 },
    },
    default: {},
  })
  progress: {
    completedLessons: { lessonId: MongooseSchema.Types.ObjectId; subLessonId: MongooseSchema.Types.ObjectId }[];
    currentLesson: MongooseSchema.Types.ObjectId;
    currentSubLesson: MongooseSchema.Types.ObjectId;
    totalTimeWatched: number;
  };
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);
