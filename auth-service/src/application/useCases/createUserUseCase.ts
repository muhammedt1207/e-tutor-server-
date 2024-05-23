import { ICreateUserUseCase } from "../../domain/useCases";
import { IDependencies } from "../interfaces/IDependencies";

export const createUserUseCase = (dependencies: IDependencies): ICreateUserUseCase => {
    const {
        repositories: { create }
    } = dependencies;
    console.log('create user use case ------------------------------');
    
    return {
        execute: async (data) => {
            try {
                return await create(data);
            } catch (error:any) {
                throw new Error(error?.message);
            }
        }
    };
};
