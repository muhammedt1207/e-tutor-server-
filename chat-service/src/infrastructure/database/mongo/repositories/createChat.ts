import { ChatEntity } from "../../../../domain/entities";
import { Chat } from "../models";

export const creatChat = async (data: ChatEntity) => {
    try {
        let chat;

        if (data.type === 'individual') {
            chat = await Chat.findOne({
                participants: { $all: data.participants, $size: 2 },
                type: 'individual'
            });

            if (!chat) {
                chat = new Chat({
                    participants: data.participants,
                    type: 'individual',
                    status: data.status || 'requested',
                    messages: []
                });
                await chat.save();
            }
        } else if (data.type === 'group') {
            chat = new Chat({
                participants: data.participants,
                type: 'group',
                status: data.status || 'requested',
                groupName: data.groupName,
                groupDescription: data.groupDescription,
                messages: []
            });
            await chat.save();
        }

        return chat as ChatEntity
    } catch (error: any) {
        throw new Error(error?.message);
    }
}
