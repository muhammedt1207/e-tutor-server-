import { IDependencies } from '../../application/insterfaces/IDependencies'
import { createChatController } from './createChatController'



export const controllers=(dependencies:IDependencies)=>{
    return{
        createChat:createChatController(dependencies),
    }
}