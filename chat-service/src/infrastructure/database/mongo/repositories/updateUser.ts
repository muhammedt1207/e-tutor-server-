import { User } from "../models/user"

export const updateUser=async(
    data:any
)=>{
    try {
        const updated=await User.findOneAndUpdate({email:data.email},{data},{new:true})
        if(!updated){
            throw new Error("User updation failed");
        }
        return updated
    } catch (error:any) {
        throw new Error(error?.message);
        
    }
}