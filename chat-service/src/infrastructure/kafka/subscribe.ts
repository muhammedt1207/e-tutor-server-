import { userCreatedConsumer,instructorVerification,updateConsumer,createChat,createGroupChat, addToGroup } from "./consumers"
export interface ISussscriber{
   userCreate(data:any):Promise<void>;
   updateUser(data:any):Promise<void>;
   instructorAcceptence(data:any):Promise<void>;
   createChat(data:any):Promise<void>;
   createGroupChat(data:any):Promise<void>;
   addToGroup(data:any):Promise<void>
}

export interface IAuthSubsciber extends Pick<ISussscriber,'userCreate'|'updateUser'|'instructorAcceptence'|'createChat'|'createGroupChat'|'addToGroup'>{}
export const    createSubscriber=():IAuthSubsciber=>{
    return{
        userCreate:userCreatedConsumer,
        updateUser:updateConsumer,
        instructorAcceptence:instructorVerification,
        createChat:createChat,
        createGroupChat:createGroupChat,
        addToGroup:addToGroup,
    }
}