import { UserEntity } from "@/domain/entities";
import { IDependencies } from "../interfaces/IDependencies";
import { IUpdataUserProfile } from "@/domain/useCases";

export const updataProfileUserUseCase = (dependencies: IDependencies) => {
    const {
        repositories: { updateProfile }
    } = dependencies;

    return {
        execute: async (data: any) => {
            return await updateProfile(data)
        }
    }
}
