import { userCreatedConsumer } from "./consumer";
import forgotPasswordConsumer from "./consumer/forgotPasswordConsumer";
import instructorApplicationAccept from "./consumer/instructorApplicationAccept";

interface IUserEvents {
    userCreated(data: any): Promise<void>;
    acceptInstructors(data:any):Promise<void>
    forgotPassword(data:any):Promise<void>
}


export interface  INotificationSubsciber extends Pick<IUserEvents,'userCreated'|'acceptInstructors'|'forgotPassword' >{}
export const createSubscriber =():INotificationSubsciber=>{
    return {
        userCreated:userCreatedConsumer,
        acceptInstructors:instructorApplicationAccept,
        forgotPassword:forgotPasswordConsumer,
    
    }
    
}