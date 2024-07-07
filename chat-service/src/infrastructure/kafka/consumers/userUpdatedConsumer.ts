import { UserEntity } from "../../../domain/entities/userEntity";
import { updateUser } from "../../database/mongo/repositories";

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