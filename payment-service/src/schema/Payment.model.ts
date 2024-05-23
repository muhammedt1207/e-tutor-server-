// src/application/schemas/session.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Payment extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  courseId: string;

  @Prop()
  sessionId: string;

  @Prop({enum:['pending','completed','failed']})
  status:string

  @Prop()
  amount:string
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
