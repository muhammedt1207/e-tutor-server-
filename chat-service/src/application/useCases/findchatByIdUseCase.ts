import { IDependencies } from "../insterfaces/IDependencies";

export const findchatByIdUseCase=(dependencies:IDependencies)=>{
    const {
        repositories:{findChatById}
    }=dependencies
    return{
        execute:async(chatId:string)=>{
            return await findChatById(chatId)
        }
    }
}