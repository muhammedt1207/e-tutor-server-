import { IDependencies } from '../../application/insterfaces/IDependencies'
import { createChatController } from './createChatController'
import { createMessageController } from './createMessageController'
import { findNotificationController } from './findNotification'
import { getChatAndMessages } from './getChatAndMessages'
import { getChatByUserId } from './getChatByUserId'



export const controllers=(dependencies:IDependencies)=>{
    return{
        createChat:createChatController(dependencies),
        createMessage:createMessageController(dependencies),
        getChatByUserId:getChatByUserId(dependencies),
        getChat:getChatAndMessages(dependencies),
        findNotification:findNotificationController(dependencies)
    }
}