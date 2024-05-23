
import { User } from "../model/UserSchema";

export const updatePassword=async(
    email:string,
    password:string
)=>{
    try {
        const updatePassword=await User.findOneAndUpdate({email:email},{$set:{password:password}},{new:true})
        if(!updatePassword){
            throw new Error("Password can't update");
        }
        return updatePassword
    } catch (error:any) {
        console.log('error in update password repositories',error);
        
     throw new Error(error);
        
    }
}