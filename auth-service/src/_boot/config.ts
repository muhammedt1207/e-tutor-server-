import mongoose from "mongoose";

export default async()=>{
    try {
        const mongoUrl=process.env.DB_URL
        console.log(mongoUrl);
        if(!mongoUrl){
            throw new Error("mongo connection url not providing");
            
        }
        await mongoose.connect(mongoUrl.trim())
        console.log('🍃🍃🍃🍃🍃MONGO DB CONNECTED🍃🍃🍃🍃🍃🍃🍃');
        
        
    } catch (error) {
        console.log("error happend in mongodb connection",error);
        process.exit(1)
        
    }
}