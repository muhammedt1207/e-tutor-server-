import { UserEntity } from "@/domain/entities/userEntity";
import { User } from "../models/user";

export const updateRole = async (
    id: string
): Promise<UserEntity | null> => {
    try {
        const update = await User.findOneAndUpdate({ id }, { role:'instructor' }, { new: true })
        if (!update) {
            throw new Error("User Updation failed");
        }
        return update
    } catch (error:any) {
        throw new Error(error?.message);

    }
}