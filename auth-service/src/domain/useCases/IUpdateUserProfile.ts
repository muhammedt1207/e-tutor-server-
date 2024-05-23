import { UserEntity } from "../entities";

export interface IUpdataUserProfile {
    execute(data: any): Promise<UserEntity | null>
}