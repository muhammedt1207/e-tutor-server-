import { generateAccessToken } from "_lib/http/jwt";
import { generateRefreshToken } from "_lib/http/jwt/generateRefreshToken";

import { IDependencies } from "application/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";

export const loginController = (dependencies: IDependencies) => {
    const {
        useCases: { loginUserUseCase }
    } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body);
            
            // const { value, error } = loginCalidation.validate(req.body)

            // if (error) {
            //     throw new Error(error.message);
            // }
            const value=req.body
            const result = await loginUserUseCase(dependencies)
                .execute(value.email, value.password)

            const accessToken = generateAccessToken(
                String(result?._id),
                value.email,
                result?.role!
            )

            const refreshToken = generateRefreshToken(
                String(result?._id),
                value.email,
                result?.role!
            )
            console.log(refreshToken);
            console.log(accessToken);
            
            
            res.cookie('access_token',accessToken,{
                httpOnly:true
          })
          res.cookie('refresh_token',refreshToken,{
            httpOnly:true
          })
          
          res.status(200).json({
            success:true,
            data:result,
            message:"User logged-in"
          })


        } catch (error) {
            next(error)
        }
    }

}