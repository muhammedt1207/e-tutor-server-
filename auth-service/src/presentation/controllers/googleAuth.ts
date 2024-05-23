import { dependancies } from "@/_boot/dependencies";
import { generateAccessToken } from "@/_lib/http/jwt";
import { generateRefreshToken } from "@/_lib/http/jwt/generateRefreshToken";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { UserEntity } from "@/domain/entities";
import { NextFunction, Request, Response } from "express";

export const googleAuthController = (dependancies:IDependencies)=>{
    const {
        useCases:{createUserUseCase,findUserByEmailUseCase}
    }=dependancies
   return async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const body:{
            name:string,
            email:string
        }=req.body
        const {email}=req.body
console.log(body,email,'user dataaaaaaaa');

        const exist = await findUserByEmailUseCase(dependancies).execute(body.email)
        console.log('user is :',exist);
        
        if(exist){
            const accessToken = generateAccessToken(
                String(exist?._id), 
                body.email,       
                exist?.role         
            );

            const refreshToken = generateRefreshToken(
                String(exist?._id),
                body.email,
                exist?.role
            )

            res.cookie("access_token",accessToken,{httpOnly:true})

            res.cookie('refresh_token',refreshToken,{httpOnly:true})
            return  res.status(200).json({
                success:true,
                data:{},
                message:'user google login'
            })
        }

        const result = await createUserUseCase(dependancies).execute({
            email:body.email,
            userName:body.name,
            password:"Mhdt@1234"
        }as UserEntity)

        if(!result){
            throw new Error("User Creation error");
            
        }

        const access_token=generateAccessToken(
            String(result?._id),
            result?.email,
            result?.role
        )
        const refresh_token=generateRefreshToken(
            String(result?._id),
            result?.email,
            result?.role
        )
        // await userCreateProducer(result)

        res.cookie('access_token',access_token,{
            httpOnly:true

        })
        res.cookie('refresh_token',refresh_token,{
            httpOnly:true
        })

        res.status(200).json({
            success:true,
            data:{},
            message:"use google signup"
        })

    } catch (error) {
        next(error)
    }
   }

}