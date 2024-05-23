import { dependancies } from "@/_boot/dependencies";
import { IDependencies } from "../interfaces/IDependencies";

export const findUserByIdUseCase =(dependancies:IDependencies)=>{
    const {
        repositories:{findUserById}
    }=dependancies;

    return {
        execute:async(id:string)=>{
            return await findUserById(id)   
        }
    }
}