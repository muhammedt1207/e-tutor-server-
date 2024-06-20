import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Subscription extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  instructorId: string;

  @Prop()
  subscriptionId: string;

  @Prop()
  status: string;

  @Prop({ required: true })
  currentPeriodEnd: number;

  @Prop({ required: true })
  amount: number;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);