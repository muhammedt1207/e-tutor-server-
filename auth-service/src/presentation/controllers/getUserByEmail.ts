
import { IDependencies } from "../../application/interfaces/IDependencies";

import { NextFunction, Request, Response } from "express";

export const getUserByEmail = (dependencies: IDependencies) => {
    const {
        useCases: { findUserByEmailUseCase }
    } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const emails = req.params.email;
            console.log(emails,'email for find users----------------------------------------------------------------');
            
         
              const userData = await findUserByEmailUseCase(dependencies).execute(emails);
        
            
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