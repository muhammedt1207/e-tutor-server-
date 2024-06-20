import { Chat } from "../models";

export const getChatByUserId=async(userId:string)=>{
    try {
        const chats = await Chat.find({
            participants: userId,
            type: 'individual'
        }).exec();

        if (!chats.length) {
            throw new Error("No groups found for the user");
        }

        return chats;
    } catch (error) {
        
    }
}