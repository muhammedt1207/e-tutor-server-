import { UserEntity } from "@/domain/entities/userEntity";
import { updateUser } from "@/infrastructure/database/mongo/repositories/updateUser";

export default async(
    data:UserEntity
)=>{
    try {
        await updateUser(data)
        console.log('=======');
        
    } catch (error) {
        console.log(error);
        
    }
}