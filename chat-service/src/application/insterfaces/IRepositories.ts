import { ChatEntity, MessageEntity } from "../../domain/entities";

export interface IRepositories{
    creatChat:(data:any)=>Promise<ChatEntity|null>;
    createMessage:(messageData: MessageEntity, chatData: ChatEntity )=>Promise<MessageEntity|null>
}