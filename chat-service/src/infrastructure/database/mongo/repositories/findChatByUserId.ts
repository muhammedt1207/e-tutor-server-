import { ChatEntity } from "../../../../domain/entities";
import { Chat } from "../models";

export const findChatByUserId=async(userId:string):Promise<ChatEntity[]|null>=>{
    try {
        console.log(userId,'user idddddddd');
        const chats = await Chat.find({
            participants: { $in: [userId] },
            type: 'individual'
        }).populate('participants')
        
        if (!chats.length) {
            throw new Error("No groups found for the user");
        }
        
        return chats;
    } catch (error:any) {
        throw new Error(error?.message);
        
    }
}