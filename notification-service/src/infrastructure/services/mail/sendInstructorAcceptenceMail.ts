import { generateAcceptanceMail } from "../../../_lib/mailGenerator/generateAcceptMail";

export const sendInstructorAcceptenceMail=async(
    email:string
)=>{
    try {
        console.log(email,'for sending email for congrats');
        
        await generateAcceptanceMail(email)

    } catch (error) {
        console.log(error);
        
    }
}