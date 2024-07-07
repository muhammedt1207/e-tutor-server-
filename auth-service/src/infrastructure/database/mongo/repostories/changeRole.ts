import { UserEntity } from "domain/entities";
import { User } from "../model/UserSchema";

export const changeRole=async(id:string):Promise<UserEntity|null>=>{
    try {
        console.log(id,'user role changing...');
        
        const data=await User.findOneAndUpdate({email:id},{$set:{role:'instructor'}})
        return data
    } catch (error:any) {
        throw new Error(error);
        
    }
}