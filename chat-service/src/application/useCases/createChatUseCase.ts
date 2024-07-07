import { IDependencies } from "../insterfaces/IDependencies";
import { ChatEntity } from "../../domain/entities";

export const createChatUseCase = (dependencies: IDependencies)=> {
    const {
        repositories: { creatChat }
    } = dependencies;

    const execute = async (data: ChatEntity) => {
        return await creatChat(data);
    };

    return {
        execute
    };
};