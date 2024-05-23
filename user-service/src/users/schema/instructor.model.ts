import { Prop, SchemaFactory ,Schema} from "@nestjs/mongoose";
import { timeStamp } from "console";
import { Document } from "mongoose";

export type InstructorApplicationDocument = InstructorApplication & Document;

@Schema({ timestamps: true }) 
export class InstructorApplication{
    @Prop({ required: true })
    email: string;
  
    @Prop([String])
    profession: string[];
  
    @Prop()
    profileDescription: string;
  
    @Prop()
    githubLink: string;
    
    @Prop()
    linkedinLink:string

    @Prop({ default: false })
    accepted: boolean;
    
}

export const InstructorApplicationSchema = SchemaFactory.createForClass(InstructorApplication)