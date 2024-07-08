import InstructorAcceptanceConsumer from "./consumer/InstructorAcceptanceConsumer";
import userCreatedConsumer from "./consumer/userCreatedConsumer";

export interface ISussscriber{
    otp(data:any):Promise<void>;
    instructorAcceptence(id:any):Promise<void>;
    18(data:any):Promise<void>

}

export interface IAuthSubsciber extends Pick<ISussscriber,'otp'|'instructorAcceptence'>{}
export const createSubscriber=():IAuthSubsciber=>{
    return{
        otp:userCreatedConsumer,
        instructorAcceptence:InstructorAcceptanceConsumer,
    }
}