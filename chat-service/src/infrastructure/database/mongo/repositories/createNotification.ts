import { Notification } from "../models/notification"

export const saveNotification=async(data:any)=>{
    try {
        const newNotification = new Notification({
            recipient: data.recipientId,
            content: data.content,
            type: data.type || 'other',
            read: false,
            createdAt: new Date()
          });
          console.log('notification saving');
          
          const savedNotification = await newNotification.save();
      
          console.log('Notification saved successfully:', savedNotification);
          return savedNotification;
        } catch (error) {
          console.error('Error saving notification:', error);
          throw error; 
        }
}