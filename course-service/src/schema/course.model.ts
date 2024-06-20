import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class SubLesson extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  videoUrl: string;
}

export const SubLessonSchema = SchemaFactory.createForClass(SubLesson);

@Schema()
export class Lesson extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [SubLesson], required: true })
  subLessons: SubLesson[];
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);

@Schema()
export class Offer extends Document{
  @Prop()
  offer:number

  @Prop()
  startDate:Date

  @Prop()
  endDate:Date
}
export const Offerschema =SchemaFactory.createForClass(Offer)

@Schema({ timestamps: true })
export class Course extends Document {
  @Prop()
  title?: string;

  @Prop()
  subtitle?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' })
  category?: MongooseSchema.Types.ObjectId;

  @Prop()
  amount: number;

  @Prop()
  fixedAmount:number

  @Prop()
  topic?: string;

  @Prop()
  thumbnail?: string;

  @Prop()
  trailer?: string;

  @Prop()
  description?: string;

  @Prop({ type: [String], default: [] })
  teachings?: string[];

  @Prop({ default: 'pending' })
  status: string;

  @Prop({ type: [Lesson], required: true })
  lessons: Lesson[];

  @Prop()
  instructorRef: string;

  @Prop({ required: true, default: false })
  isBlocked: boolean;

  @Prop({ required: true, default: false })
  isPublished: boolean;

  @Prop({ default: false })
  isOfferOngoing: boolean;

  @Prop({type:Offerschema})
  offerDetails?: Offer
}

export const CourseSchema = SchemaFactory.createForClass(Course);
