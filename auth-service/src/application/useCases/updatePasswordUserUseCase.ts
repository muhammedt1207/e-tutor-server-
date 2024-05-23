import { IDependencies } from "../interfaces/IDependencies";

export const updateUserPasswordUseCase =(dependencies:IDependencies)=>{
    const {repositories:{updatePassword}}=dependencies
    return{
        execute:async(email:string,password:string)=>{
            return await updatePassword(
                email,
                password
            )
        }
    }
}