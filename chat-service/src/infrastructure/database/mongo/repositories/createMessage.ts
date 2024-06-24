import { Types } from "mongoose";
import { Chat, Message } from "../models";
import { ChatEntity, MessageEntity } from "@/domain/entities";

export const createMessage = async(messageData: MessageEntity, chatData: string): Promise<MessageEntity|null> => {
        let chat;
    console.log(messageData,chatData,'message  creating...........');
    
        
            chat = await Chat.findById(chatData);
        

        if (!chat) {
            throw new Error("Can't find Chat");
            };

           

        const newMessage = new Message({
            chat: chat._id,
            sender: messageData.sender,
            content: messageData.content,
            contentType: messageData.contentType || 'text', 
            receiverSeen: messageData.receiverSeen || false
        });

        await newMessage.save();

        chat.messages.push(newMessage._id);
        await chat.save();

        return newMessage as MessageEntity;
    
};
