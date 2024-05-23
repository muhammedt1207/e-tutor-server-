import { UserEntity } from "../../domain/entities";

export interface IRepositories{
    create:(data:UserEntity)=>Promise<UserEntity |null>
    findByEmail:(email:string)=>Promise<UserEntity |null>
    findUserById:(id:string)=>Promise<UserEntity|null>
    verifyOtp:(email:string,otp:string)=>Promise<boolean | null>
    updateProfile:(data:any)=>Promise<UserEntity|null>
    updatePassword:(email:string,password:string)=>Promise<UserEntity|null>
}