import { UserEntity } from "../entities"

export interface IUpdatePassword{
    execute(
        email:string,
        password:string
    ):Promise<UserEntity|null>
}