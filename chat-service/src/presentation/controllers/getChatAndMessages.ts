import { IDependencies } from "../../application/insterfaces/IDependencies";
import { NextFunction, Request, Response } from "express";

export const getChatAndMessages=(dependancies:IDependencies)=>{
    const{
        useCases:{findchatByIdUseCase}
    }=dependancies
    return async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const chatId=req.params.id
            const result =await findchatByIdUseCase(dependancies).execute(chatId)
            res.status(201).json({
                success:true,
                data:result,
                message:'chat datas'
            })
            
        } catch (error) {
            next(error)
        }
    }
}