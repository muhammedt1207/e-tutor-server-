import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Offer extends Document {
  @Prop()
  offer: number;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);