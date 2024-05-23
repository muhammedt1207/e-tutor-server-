import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { sendVerificationMail } from "../../infrastructure/services/mail/sendVerificationMail";

export const sendVerificationMailController =  (dependencies:IDependencies)=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        try {
            if(!req.user){
                throw new Error("email is required");            
            }
            await sendVerificationMail(req.user.email)
            res.status(200).json({
                success:true,
                data:{},
                message:"email Send"
            })
        } catch (error) {
            next(error)
        }
    }
}