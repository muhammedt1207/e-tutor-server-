import sendForgotPasswordMail from "../../services/mail/sendForgotPasswordMail";

export default async (data:{email:string,token:string})=>{
    try {
        console.log('send mail-------/////////////////////////////////////////////////////////');
        await sendForgotPasswordMail(data.email,data.token)
        
    } catch (error) {
        console.log(error);
        
    }
}