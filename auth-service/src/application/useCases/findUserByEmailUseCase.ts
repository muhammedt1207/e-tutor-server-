import { IDependencies } from "../interfaces/IDependencies";

export const findUserByEmailUseCase=(dependancies:IDependencies)=>{
    const {repositories:{findByEmail}}=dependancies
    return{
        execute:async(email:string)=>{
            return await findByEmail(email)
        }
    }
}