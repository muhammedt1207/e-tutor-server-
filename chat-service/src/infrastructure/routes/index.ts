import { Router } from "express";
import { IDependencies } from "../../application/insterfaces/IDependencies";
import { controllers } from "../../presentation/controllers";


export const router = (depentencies: IDependencies) => {
    const {
        createChat, createMessage, getChatByUserId,getChat,findNotification
    } = controllers(depentencies)

    const router = Router()

    router.route('/')
        .post(createChat)

    router.route('/:id')
        .get(getChat)
    router.route('/message')
        .post(createMessage)

    router.route('/chats/:id')
        .get(getChatByUserId)

    router.route('/notification/:id')
        .get(findNotification)
    return router
}