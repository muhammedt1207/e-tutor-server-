import { IOtp } from "@/domain/entities";
import { required } from "joi";
import { Schema, model } from "mongoose";


const otpSchema:Schema=new Schema(
    {
        email:{
            type:String,
            require:true,
            unique:true
        },
        otp:{
            type:String,
            required:true,
        },
        createdOn:{
            type:Date,
            expires:'6m',
            default:Date.now
        }
    },{
timestamps:true
    }
)

export const OtpModel = model<IOtp>("otp",otpSchema);

export interface IOtpDocument extends IOtp{
    createdAt:Date,
    updatedAt:Date
}