import { UserEntity } from "@/domain/entities";
import { User } from "../model/UserSchema";

export const getAllUser=async():Promise<any|null>=>{
    try {
        const allUser=await User.find({role:'student'},{password:0})
        return allUser
    } catch (error:any) {
        throw new Error(error);
        
    }
}