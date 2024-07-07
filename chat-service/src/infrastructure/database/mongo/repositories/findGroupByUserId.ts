import { ChatEntity } from "../../../../domain/entities";
import { Chat } from "../models";

export const findGroupByUserId = async (userId: string):Promise<ChatEntity[]|null> => {
    try {
        const chats = await Chat.find({
            participants: userId,
            type: 'group'
        }).exec();

        if (!chats.length) {
            throw new Error("No groups found for the user");
        }

        return chats;
    } catch (error: any) {
        throw new Error(error?.message);
    }
};