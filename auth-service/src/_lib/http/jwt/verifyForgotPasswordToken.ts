import jwt from 'jsonwebtoken'

export const verifyForgotPasswordToken=(token:string):Promise<any>=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token,String(process.env.FOGOT_PASSWORD_TOKEN),
        (error,decode)=>{
            if(error){
                reject(new Error(error.message))
            }else{
                console.log(decode);
                resolve(decode)
            }
        })
    })
}