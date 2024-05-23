import { saveOtp } from "@/infrastructure/database/mongo/repostories/saveOtp";

export default async(
    data:{ email: string; otp: string; }
)=>{
    try {
        console.log('send verification-mail-consumed');
        await saveOtp(data.email,data.otp)
        
    } catch (error) {
        console.log('user-created-consumer mail send error:',error)
    }
}