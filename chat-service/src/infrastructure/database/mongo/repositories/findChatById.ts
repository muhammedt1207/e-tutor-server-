import { ChatEntity } from "../../../../domain/entities";
import { Chat } from "../models";

export const findChatById = async (chatId: string): Promise<ChatEntity|null> => {
    try {
      
        const chat = await Chat.findById(chatId)
        .populate({
            path: 'messages',
            populate: {
              path: 'sender',
              select: 'userName profileImageUrl'
            }
          });

        if (!chat) {
            throw new Error("Chat not found");
        }
        return chat;
    } catch (error: any) {
        throw new Error(error?.message);
    }
};
