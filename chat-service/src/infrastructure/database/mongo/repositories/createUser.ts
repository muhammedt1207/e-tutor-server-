import { UserEntity } from "@/domain/entities/userEntity";
import { User } from "../models/user";

export const createUser =async(
    data:UserEntity
):Promise<UserEntity |null>=>{
    try {
        console.log('user create dataaaaaaaaaaasssssssssssss',data);
        
        const newUser=await User.create(data);
        if(!newUser){
            throw new Error("User creation failed");
        }
        return newUser
    } catch (error:any) {
        throw new Error(error?.message);
        
    }
}