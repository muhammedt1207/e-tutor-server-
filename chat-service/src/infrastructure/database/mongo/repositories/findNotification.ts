import { Notification } from "../models/notification"

export const findNotification=async(data:any)=>{
    try {
        const notification=await Notification.find({recipient:data})
        return notification;
    } catch (error) {
        console.log(error);
        
    }
}