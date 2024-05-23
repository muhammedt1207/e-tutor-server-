import { saveOtp } from "../database/mongo/repostories/saveOtp"

export const updateOTP = async(email:string,otp:string)=>{
    try {
        await saveOtp(
            email,
            otp
        )
    } catch (error) {
        console.log(error)
    }
}