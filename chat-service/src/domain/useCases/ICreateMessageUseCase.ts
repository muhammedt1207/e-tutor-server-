import { ChatEntity, MessageEntity } from "../entities";

export interface ICreateMessageUseCase{
    execute(messageData: MessageEntity, chatData: ChatEntity):Promise<MessageEntity|null>
}