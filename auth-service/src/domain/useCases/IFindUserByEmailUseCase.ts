

export interface IFindUserByEmailUseCase{
    execute(email:string):Promise<any>
}