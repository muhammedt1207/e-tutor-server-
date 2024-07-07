import { genereateForgetPasswordMail } from "../../../_lib/mailGenerator/generateForgotPasswordMail";

export default async(email:string,token:string)=>{
    try {
        await genereateForgetPasswordMail(email,`http://localhost:5173/change-password?token=${token}`)
    } catch (error) {
        console.log(error);
        
    }
}