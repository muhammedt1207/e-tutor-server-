import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { jwtMiddleware } from "../../_lib/middlewares/jwtVerification";
import { controllers } from "../../presentation/controllers";

export const notificationRouter=(dependencies:IDependencies)=>{
    const {
        sendVerificationMail
    }=controllers(dependencies)

    const router= Router()

    router.route("/email-verification")
    .get(jwtMiddleware,sendVerificationMail)

    return router
}