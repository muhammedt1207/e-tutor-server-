import { IFindUserByIdUseCase } from "@/domain/useCases/IFindUserByIdUseCase";
import { ICreateUserUseCase, ILoginUserUseCase, IUpdataUserProfile, IUpdatePassword, IVerifyOtpUseCase } from "../../domain/useCases";
import { IDependencies } from "../interfaces/IDependencies";
import { IFindUserByEmailUseCase } from "@/domain/useCases/IFindUserByEmailUseCase";

export interface IUseCases {
    createUserUseCase: (dependencies: any) => ICreateUserUseCase;
    loginUserUseCase: (dependencies: any) => ILoginUserUseCase;
    findUserByIdUseCase:(dependencies:any)=>IFindUserByIdUseCase;
    findUserByEmailUseCase:(dependencies:any)=>IFindUserByEmailUseCase;
    verifyOtpUseCase:(dependencies:any)=>IVerifyOtpUseCase;
    updateProfileUseCase:(dependencies:any)=>IUpdataUserProfile;
    updatePasswordUseCase:(dependencies:any)=>IUpdatePassword;
    
}
