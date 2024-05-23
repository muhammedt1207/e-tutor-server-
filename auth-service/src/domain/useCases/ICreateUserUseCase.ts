import { UserEntity } from "../entities";

export interface ICreateUserUseCase{
    execute(data:any):Promise<UserEntity | null>;
}