import { IDependencies } from "../application/interfaces/IDependencies";
import * as repositories from '../infrastructure/database/mongo/repostories'
import * as useCases from "../application/useCases"

export const dependancies:IDependencies={
    repositories,
    useCases: {
        ...useCases,
        updateProfileUseCase: useCases.updataProfileUserUseCase,
        updatePasswordUseCase:useCases.updateUserPasswordUseCase
      },
}