import { IDependencies } from "application/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";

export const getUsersByEmail = (dependencies: IDependencies) => {
    const {
        useCases: { findUserByEmailUseCase }
    } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const emails = req.body.userIds;
            console.log(emails,'email for find users----------------------------------------------------------------');
            
            const userData:any = [];
            for (let i = 0; i < emails.length; i++) {
                userData[i] = await findUserByEmailUseCase(dependencies).execute(emails[i]);
            }
            
            res.status(200).json({
                success: true,
                data: userData ,
                message: "All user data retrieved successfully"
            });
        } catch (error) {
            next(error);
        }
    }
}