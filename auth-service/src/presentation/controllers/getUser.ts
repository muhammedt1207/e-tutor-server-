import { IDependencies } from "application/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";


export const getUserController = (dependancies: IDependencies) => {
    const {
        useCases: { findUserByIdUseCase }
    } = dependancies

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                throw new Error("User doesn't exist!");
            }

            const result = await findUserByIdUseCase(dependancies).execute(req.user.userId)
            if (!result) {
                throw new Error("User doesn't exist");
            }
            console.log(result,'user data in get user data');
            
            res.status(200).json({
                success: true,
                data: result,
                message: 'User exist'
            })
        } catch (error) {
            next(error)
        }
    }
}