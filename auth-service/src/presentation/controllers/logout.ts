import { IDependencies } from "application/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";

export const logoutController = (dependancies:IDependencies)=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        try {
            res.cookie("access_token","",{
                maxAge:1
            })
            res.cookie("refresh_token","",{
                maxAge:1
            })
            console.log('cookie is cleared');
            
            res.status(204).json({})
        } catch (error) {
            next(error)
        }
    }
}