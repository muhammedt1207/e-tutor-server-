import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InstructorApplicationDocument = InstructorApplication & Document;

// Define the Address Schema
@Schema()
class Address {
    @Prop({ required: true })
    houseName: string;

    @Prop({ required: true })
    post: string;

    @Prop({ required: true })
    street: string;

    @Prop({ required: true })
    country: string;

    @Prop({ required: true })
    state: string;

    @Prop({ required: true })
    district: string;
}

const AddressSchema = SchemaFactory.createForClass(Address);

@Schema({ timestamps: true })
export class InstructorApplication {
    @Prop({ required: true })
    email: string;

    @Prop([String])
    profession: string[];

    @Prop()
    profileDescription: string;

    @Prop()
    githubLink: string;

    @Prop()
    linkedinLink: string;

    @Prop({ type: AddressSchema, required: true })
    address: Address;

    @Prop()
    idFileUrl:string

    @Prop()
    qualificationFileUrl:string

    @Prop({ default: false })
    accepted: boolean;
}

export const InstructorApplicationSchema = SchemaFactory.createForClass(InstructorApplication);
