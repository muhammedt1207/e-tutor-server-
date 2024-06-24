import { dependancies } from "@/_boot/dependencies";
import { IDependencies } from "../insterfaces/IDependencies";

export const findChatByUserIdUseCase=(dependancies:IDependencies)=>{
    const{
        repositories:{findChatByUserId}
    }=dependancies
    return{
        execute:async(userId:string)=>{
            return await findChatByUserId(userId)
        }
    }
}