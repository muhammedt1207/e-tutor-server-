import { OtpModel } from "../model/OtpSchema"

export const verifyOtp=async(email:string,otp:string):Promise<boolean>=>{
    try {
        const verified=await OtpModel.findOne({email:email,otp:otp})
        if(!verified) return false
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}