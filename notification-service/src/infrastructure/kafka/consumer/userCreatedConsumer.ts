import { sendVerificationMail } from "../../services/mail"

export default async(
    data:string
)=>{
    try {
        console.log('consumer working mail is sending on processs');
        console.log(data,'00000000');
        
        await sendVerificationMail(data)

    } catch (error) {
        console.log(error);
        
    }
}