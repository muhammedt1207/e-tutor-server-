import { UserEntity } from "../entities";

export interface IFindUserByIdUseCase{
    execute(email:string):Promise<UserEntity |null>;
}