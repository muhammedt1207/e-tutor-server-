import { sendInstructorAcceptenceMail } from "../../services/mail/sendInstructorAcceptenceMail";

export default async(
    
        email:string
    
)=>{
    try {
        console.log('consumer worked mail sending under the process');
        
        await sendInstructorAcceptenceMail(email)
        console.log('send instructors mail');
        
    } catch (error) {
        console.log('instructors application maile send error :',error);
        
    }
}