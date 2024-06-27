import { Chat } from "../models";

export const setLastSeen = async (userId: string, timestamp: any) => {
  try {
    console.log(userId, timestamp, 'saving last seen ...');
    timestamp = new Date();

    const chat = await Chat.findOne({ 'participants': userId });

    if (!chat) {
      throw new Error('Chat not found');
    }

    let userLastSeen = chat.lastSeen.find(participant => participant.participant?.toString() === userId);
    
    if (userLastSeen) {
      userLastSeen.seenAt = timestamp;
    } else {
      chat.lastSeen.push({ participant: userId, seenAt: timestamp });
    }

    await chat.save();

  } catch (error) {
    console.error('Error updating last seen:', error);
  }
};
