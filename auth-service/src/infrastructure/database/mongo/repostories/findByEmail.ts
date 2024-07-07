import { UserEntity } from "domain/entities";
import { User } from "../model/UserSchema";

export const findByEmail=async(
    email:string
):Promise<UserEntity|null>=>{
    try {
        const existUser=await User.findOne({
            email:email
        })
        console.log('user data by find by email :',existUser,email);
        
        return existUser
    } catch (error:any) {
        throw new Error(error?.message);
        
    }
}