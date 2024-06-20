import { ChatEntity } from "@/domain/entities";
import { Chat } from "../models";
import { Types } from "mongoose";

export const findChatById = async (chatId: string): Promise<ChatEntity|null> => {
    try {
      
        const chat = await Chat.findById(chatId)
            .populate('messages')
            .exec();

        if (!chat) {
            throw new Error("Chat not found");
        }
        return chat;
    } catch (error: any) {
        throw new Error(error?.message);
    }
};
