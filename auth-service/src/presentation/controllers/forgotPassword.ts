import { dependancies } from "@/_boot/dependencies";
import { ErrorResponse } from "@/_lib/http/common/error";
import { generateForgetToken } from "@/_lib/http/jwt/genarateForgetToken";
import { IDependencies } from "@/application/interfaces/IDependencies";
import forgetPasswordProducer from "@/infrastructure/kafka/producer/forgetPasswordProducer";
import { NextFunction, Request, Response } from "express";

export const forgotPassword=(dependancies:IDependencies)=>{
    const{
        useCases:{findUserByEmailUseCase}
    }=dependancies
    return async (req:Request,res:Response,next:NextFunction)=>{
        try {
            const {email}=req.body
            if(!email){
                return next(ErrorResponse.unauthorized('no email found'))
            }

            const existUser =await findUserByEmailUseCase(dependancies).execute(email)
            console.log(existUser);
            if(!existUser){
                return next(ErrorResponse.unauthorized("we can't find an accound with that email"))
            }

            const token=generateForgetToken(email)
            console.log(token,'created token');
            
            await forgetPasswordProducer({email,token});

            res.status(200).json({
                success:true,
                data:{},
                message:"Mail produced"
            })
            
        } catch (error) {
            console.log(error);
            
                res.status(400).json({
                    success:false,
                    message:'forgot password failed'
                })
        }
    }
}