import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
    type:{
        avatar:String,
        dob:String,
    }
  })
  profile: {
    avatar: string;
    dob: string;
  };

  @Prop({ default: false })
  isBlocked: boolean;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop()
  profession: string;

  @Prop()
  otp: string;

  @Prop({ type: Number, default: 0 })
  profit: number;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
