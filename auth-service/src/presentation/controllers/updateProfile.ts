
import { IDependencies } from "application/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

export const updateProfileController =(dependancies:IDependencies)=>{
    const{
        useCases:{updateProfileUseCase,findUserByIdUseCase}
    }=dependancies
    return async(req:Request,res:Response,next:NextFunction)=>{
        try {
            // if(!req.user){
            //     throw new Error("User doesn't not exit");
            // }
            const userData={
                _id:new Types.ObjectId(req.body._id),
                userName:req.body.userName,
                phoneNumber:req.body.phoneNumber,
                profileImageUrl:req.body?.profileImageUrl
            }
            console.log(userData,'this is user data for update ');
            const userExist=await findUserByIdUseCase(dependancies).execute(String(userData._id))
            if(!userExist){
                throw new Error("user not exit");
                
            }
            const result=await updateProfileUseCase(dependancies).execute(userData)
            if(!result){
                throw new Error("can't update the user profile");
            }
            res.status(200).json({message:"Profile update successfully",data:result})
        } catch (error) {
            next(error)
        }
    }
}