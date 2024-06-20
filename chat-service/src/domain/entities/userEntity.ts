import {ObjectId} from 'mongoose'

enum Role{
    student='student',
    instructur='instructor',
    admin='admin'
}

interface profile{
    avatar?:string,
    dob?:Date,
}


export interface UserEntity{
    _id?:ObjectId,
    userName:string,
    email:string,
    password?:string,
    phoneNumber:number,
    role:Role,
    profileImgUrl?:string,
    isBlocked:boolean,
    createdAt?:Date,
    Otp?:string,
    profession?:string
}
