import { Router } from "express";
import { IDependencies } from "../../application/insterfaces/IDependencies";
import { controllers } from "../../presentation/controllers";
import { jwtMiddleware } from "../../_lib/jwt/jwt.Verification";

export const router=(depentencies:IDependencies)=>{
    const{
    createChat        
    }=controllers(depentencies)

    const router=Router()
    
    router.route('/')
    .post(createChat)

    router.route('/message')
    
    return router
}