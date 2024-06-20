import { ICreateChatUseCase, ICreateMessageUseCase } from "../../domain/useCases";
import { IDependencies } from "./IDependencies";

export interface IUseCases{
    createChatUseCase:(dependencies:IDependencies)=>ICreateChatUseCase;
    createMessageUseCase:(dependencies:IDependencies)=>ICreateMessageUseCase;
}