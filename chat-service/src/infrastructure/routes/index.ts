import { Router } from "express";
import { IDependencies } from "../../application/insterfaces/IDependencies";
import { controllers } from "../../presentation/controllers";
import { jwtMiddleware } from "../../_lib/jwt/jwt.Verification";
import { createMessage } from "../database/mongo/repositories";


export const router = (depentencies: IDependencies) => {
    const {
        createChat, createMessage, getChatByUserId,getChat
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

    return router
}