import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ['student', 'instructor', 'admin'], default: 'student' })
  role: string;

  @Prop({
    type: {
      avatar: { type: String },
      dob: { type: String },
    },
  })
  profile: {
    avatar: string;
    dob: string;
  };

  @Prop({ default: false })
  isBlocked: boolean;

  @Prop()
  phoneNumber: number;

  @Prop()
  profileImageUrl: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop()
  profession: string;

  @Prop()
  otp: string;

  @Prop({ default: 0 })
  profit: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
