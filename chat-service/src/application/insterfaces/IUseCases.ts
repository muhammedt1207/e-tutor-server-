import { ICreateChatUseCase, ICreateMessageUseCase, IfindChatByUseCase, IfindGroupByUserUseCase } from "../../domain/useCases";
import { IDependencies } from "./IDependencies";

export interface IUseCases{
    createChatUseCase:(dependencies:IDependencies)=>ICreateChatUseCase;
    createMessageUseCase:(dependencies:IDependencies)=>ICreateMessageUseCase;
    findGroupByUserId:(dependencies:IDependencies)=>IfindGroupByUserUseCase;
    findchatByIdUseCase:(dependencies:IDependencies)=>IfindChatByUseCase;
}