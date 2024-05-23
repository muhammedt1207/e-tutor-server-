
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';


interface UserPayload{
    userId:string,
    email:string,
    role:string
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}


export const jwtMiddleware = async (req:Request,res:Response,next:NextFunction):Promise<any>=>{
    console.log('check point 1 //////////////////////');
    
    const token =req.cookies.access_token || (req.headers.authorization?.split(' ')[1] || '');
    if(!token){
        return res.sendStatus(401)
    }
    
    try {
        const decode = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET!)as UserPayload;
        req.user = decode;
        console.log(req.user,'user in jwt');
        
        next()
    } catch (error) {
        res.status(403)
    }
}