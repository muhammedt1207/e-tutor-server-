import { Types } from "mongoose";
import { Chat, Message } from "../models";
import { ChatEntity, MessageEntity } from "@/domain/entities";

export const createMessage = async(messageData: MessageEntity, chatData: ChatEntity): Promise<MessageEntity|null> => {
        let chat;

        if (chatData.type === 'individual') {
            chat = await Chat.findOne({
                participants: { $all: chatData.participants, $size: 2 },
                type: 'individual'
            });
        }

        if (chatData.type === 'group' && chatData.groupName) {
            chat = await Chat.findOne({
                groupName: chatData.groupName,
                
                type: 'group'
            });
        }

        if (!chat) {
            const newChat = new Chat({
                participants: chatData.participants,
                type: chatData.type,
                status: chatData.status || 'requested',
                groupName: chatData.groupName || null,
                groupDescription: chatData.groupDescription || null,
                messages: [] 
            });

            chat = await newChat.save();
        }

        const newMessage = new Message({
            chat: chat._id,
            sender: messageData.sender,
            receiver: chatData.type === 'individual' ? messageData.receiver : undefined,
            content: messageData.content,
            contentType: messageData.contentType || 'text', 
            receiverSeen: messageData.receiverSeen || false
        });

        await newMessage.save();

        chat.messages.push(newMessage._id);
        await chat.save();

        return newMessage as MessageEntity;
    
};
