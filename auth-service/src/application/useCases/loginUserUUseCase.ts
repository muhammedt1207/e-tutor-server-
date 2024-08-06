
import { IDependencies } from "../interfaces/IDependencies"
import { comparePassword } from "../../_lib/http/bcript/comparePassword"

export const loginUserUseCase =(dependancies:IDependencies)=>{
    const {repositories:{findByEmail}}=dependancies

    return {
        execute:async (email:string,password:string)=>{
            try {
                const result =await findByEmail(email)
                if(!result){
                    throw new Error("Email or Password is Incorrect!");
                }

                const match = await comparePassword(password,result.password!);
                if(!match){
                    // const error = ErrorResponse.conflict('User already exist, try another email');
                    // return   
                 }

                return result
            } catch (error:any) {
                throw new Error(error?.message);
                
            }
        }
    }
}