import { IOtp } from "domain/entities";
import { OtpModel } from "../model/OtpSchema"

export const saveOtp=async(email:string,otp:string):Promise<IOtp |null>=>{
try {
    console.log('inside of saveOtp');
    const save = await OtpModel.updateOne(
        {email:email},
        {$set:{otp:otp}},
        {upsert:true,new:true}
    )
    if(!save){
        throw new Error("OTP updated failed");
        
    }
    console.log('otp saved ✅❎✳✅❎✅');
    const updatedUser = await OtpModel.findOne({email:email});
    return updatedUser;
} catch (error:any) {
    console.log(error);
    
    throw new Error(error?.message);
    
}
}