import { findUserByEmailUseCase, verifyOtpUseCase } from "@/application/useCases";
import { hashPassword } from "../../_lib/http/bcript/hashPassword";
import { generateAccessToken } from "../../_lib/http/jwt";
import { generateRefreshToken } from "../../_lib/http/jwt/generateRefreshToken";
import { signupValidation } from "../../_lib/http/validation/signup";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { Request, Response, NextFunction } from 'express'
import { ErrorResponse } from "@/_lib/http/common/error";
import { userCreatedConsumer } from "@/infrastructure/kafka/consumer";
import userCreatedProducer from "@/infrastructure/kafka/producer/userCreatedProducer";

export const signupController = (dependencies: IDependencies) => {
    const {
        useCases: { createUserUseCase, findUserByEmailUseCase, verifyOtpUseCase }
    } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('this is user signup controller ✅▶');

            const userData = req.body;
            console.log('this is user signup controller ✅▶', userData);


            if (!userData.Otp) {
                try {
                    const userExist: any = await findUserByEmailUseCase(dependencies).execute(userData.email)

                    console.log(userExist);
                    if (userExist) {
                        const error = ErrorResponse.conflict('User already exist, try another email');
                        return next(error);
                    }

                } catch (error) {
                    console.log(error, 'user exist error')
                    next(error)
                }
            }

            if (!userData.otp) {
                try {
                    await userCreatedProducer(userData.email)
                    console.log('user created producer sending......');

                    return res.status(200).json({
                        success: true,
                        data: userData,
                        message: 'otp sent successfully'
                    })
                } catch (error) {
                    console.log('somthing happend in otp section', error)
                    return res.json({
                        success: false,
                        message: "Somthing wrng in otp section"
                    })
                }

            }

            if (userData.otp) {
                try {
                    console.log('user otp verifying');
                    // const {value,error}=signupValidation.validate(req.body)
                    // if(error){
                    //     throw new Error(error?.message);
                    // }
                    const isOtpVerified = await verifyOtpUseCase(dependencies).execute(
                        userData.email,
                        userData.otp
                    )
                    console.log('user otp verified');

                    if (!isOtpVerified) {
                        const { email, ...restValues } = userData;
                        return res.status(401).json({
                            user: restValues,
                            success: false,
                            message: 'Otp is invalid '
                        })
                    }
                } catch (error: any) {
                    console.log('somthing happed in verify otp', error);
                    return res.json({
                        success: false,
                        message: 'Otp invalid'
                    })
                }
            }
            if (userData.otp) {
                try {


                    userData.password = await hashPassword(userData.password)

                    const result = await createUserUseCase(dependencies).execute(userData)
                    if (!result) {
                        return new Error("User Creation failed");
                    }
                    await userCreatedProducer(result)

                    const accessToken = generateAccessToken(
                        String(result?._id),
                        result?.email,
                        result?.role
                    )


                    const refreshToken = generateRefreshToken(
                        String(result?._id),
                        result?.email,
                        result?.role
                    )

                    res.cookie("access_token", accessToken, {
                        httpOnly: true
                    })

                    res.cookie('refresh_token', refreshToken, {
                        httpOnly: true
                    })
                    res.status(200).json({
                        success: true,
                        data: result,
                        message: "user Created"
                    })
                } catch (error) {
                    console.log(error)
                }
            }

        } catch (error) {
            next(error)
        }
    }
}