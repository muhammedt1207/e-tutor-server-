import { UserEntity } from "../../../../domain/entities";
import { User } from "../model/UserSchema";

export const updateProfile=async(data:any):Promise<UserEntity|null>=>{
    try {
        const userData=await User.findOneAndUpdate({_id:data._id},{$set:{userName:data.userName,phoneNumber:data.phoneNumber,profileImageUrl:data.profileImageUrl}},{new:true})

        return userData
    } catch (error:any) {
        throw new Error(error)
    }
}