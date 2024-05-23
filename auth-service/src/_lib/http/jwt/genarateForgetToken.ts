import jwt from "jsonwebtoken";

export const generateForgetToken=(
    payload:{
        email:string
    }
)=>{
    const secret=process.env.FOGOT_PASSWORD_TOKEN;
    if(!secret){
        throw new Error("token secret not found");
        
    }
    try {
        return jwt.sign({email:payload.email}, secret, { expiresIn: '10m' });
    } catch (error:any) {
        throw new Error("Failed to create token :"+error?.message);
        
    }
}