import { ChatEntity, MessageEntity } from "../../domain/entities";

export interface IRepositories{
    creatChat:(data:any)=>Promise<ChatEntity|null>;
    createMessage:(messageData: MessageEntity, chatData: string )=>Promise<MessageEntity|null>
    findGroupByUserId:(userId:string)=>Promise<ChatEntity[]|null>
    findChatById:(chatId:string)=>Promise<ChatEntity|null>
    findChatByUserId:(userId:string)=>Promise<ChatEntity[]|null>
    findNotification:(userId:string)=>Promise<any>
}