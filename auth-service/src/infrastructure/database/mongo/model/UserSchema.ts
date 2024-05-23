import { Schema, model } from "mongoose";
import { UserEntity } from "../../../../domain/entities";



const UserSchema= new Schema({
    userName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['student','instructor','admin'],
        default:'student'
    },
    profile:{
        avatar:{
            type:String
        },
        dob:{
            type:String
        }
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    phoneNumber:{
        type:Number
    },
    profileImageUrl:{
        type:String
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    profession:{
        type:String
    },
    otp:{
        type:String,
    },
    profit:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

export const User =model<UserEntity>("users",UserSchema)