import { userCreatedConsumer,instructorVerification,updateConsumer } from "./consumers"
export interface ISussscriber{
   userCreate(data:any):Promise<void>;
   updateUser(data:any):Promise<void>;
   instructorAcceptence(data:any):Promise<void>;
}

export interface IAuthSubsciber extends Pick<ISussscriber,'userCreate'|'updateUser'|'instructorAcceptence'>{}
export const createSubscriber=():IAuthSubsciber=>{
    return{
        userCreate:userCreatedConsumer,
        updateUser:updateConsumer,
        instructorAcceptence:instructorVerification
    }
}