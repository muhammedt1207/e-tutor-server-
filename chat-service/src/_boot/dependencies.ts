import { IDependencies } from '../application/insterfaces/IDependencies';
import * as repositories from '../infrastructure/database/mongo/repositories'
import * as useCases from "../application/useCases"

export const dependancies:IDependencies={
    repositories,
    useCases
}