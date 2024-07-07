
import { IDependencies } from "../interfaces/IDependencies";

export const verifyOtpUseCase = (dependancies:IDependencies)=>{
    const {
        repositories:{verifyOtp}
    }=dependancies
    return{
        execute:async(email:string,otp:string)=>{
            try {
                return await verifyOtp(email,otp)
            } catch (error) {
                console.log('somthing went wrong in veriify otp use case');
                return false
                
            }
        }
    }
}