import { userCreatedConsumer,instructorVerification,updateConsumer,createChat,createGroupChat, addToGroup, otp } from "./consumers"
export interface ISussscriber{
    userCreated(data:any):Promise<void>;
   updateUser(data:any):Promise<void>;
   acceptInstructors(data:any):Promise<void>;
   createChat(data:any):Promise<void>;
   createGroupChat(data:any):Promise<void>;
   addToGroup(data:any):Promise<void>;
   otp(data:any):Promise<void>;
   18(data:any):Promise<void>;

}

export interface IAuthSubsciber extends Pick<ISussscriber,18|'otp'|'userCreated'|'updateUser'|'acceptInstructors'|'createChat'|'createGroupChat'|'addToGroup'>{}
export const    createSubscriber=():IAuthSubsciber=>{
    return{
        userCreated:userCreatedConsumer,
        updateUser:updateConsumer,
        acceptInstructors:instructorVerification,
        createChat:createChat,
        createGroupChat:createGroupChat,
        addToGroup:addToGroup,
        otp:otp,
        18:otp
    }
}