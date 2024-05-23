import { hashPassword } from "@/_lib/http/bcript/hashPassword";
import { ErrorResponse } from "@/_lib/http/common/error";
import { verifyForgotPasswordToken } from "@/_lib/http/jwt/verifyForgotPasswordToken";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";

export const updatePasswordController = (dependencies: IDependencies) => {
    const {
        useCases: { findUserByEmailUseCase, updatePasswordUseCase, loginUserUseCase }
    } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body, 'user data in change password');
            const { param, oldPassword, newPassword } = req.body;

            
            let email = null;
            if (param) {
                const decode = await verifyForgotPasswordToken(param);
                email = decode.email;
            } else {
                const checkUser = await loginUserUseCase(dependencies).execute(req.body.email, oldPassword);
                if (!checkUser) {
                    return next(ErrorResponse.notFound('Old Password is Incorrect'));
                }
                console.log(checkUser, 'user password is correct');

                email = req.body.email;
            }

            const userExist = await findUserByEmailUseCase(dependencies).execute(email);
            console.log(userExist, '...............');

            if (!userExist) {
                return next(ErrorResponse.notFound('User not found'));
            }

            const hashedPassword = await hashPassword(newPassword);

            const updatedPassword = await updatePasswordUseCase(dependencies).execute(email, hashedPassword);

            if (updatedPassword) {
                return res.status(200).json({
                    success: true,
                    data: userExist,
                    message: 'User password changed'
                });
            } else {
                return next(ErrorResponse.internalError('Failed to change password'));
            }
        } catch (error) {
            console.log(error);
            return next(ErrorResponse.internalError('Error changing password'));
        }
    };
};
