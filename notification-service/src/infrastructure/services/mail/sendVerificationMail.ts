import { sendVerifyMailProducer } from "@/infrastructure/kafka/producer";
import { generateVerificationMail } from "../../../_lib/mailGenerator/generateVerificationMail"
import { generateOTPCode } from "../../../_lib/otp"



export const sendVerificationMail = async (email:string)=>{
    try {
        const otp =generateOTPCode()
        console.log(typeof otp,email);
        
        const sendMail=await generateVerificationMail(email,otp)
        console.log('send verification mail producer ');
        
        await sendVerifyMailProducer({email:email,otp:otp})
    } catch (error) {
        console.log('mail servise error',error);
        
    }
}