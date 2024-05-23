import express,{ Express,Request,Response,NextFunction, Application } from "express";
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { notificationRouter } from "../infrastructure/routes";
import { dependancies } from "../_boot/dependencies";

dotenv.config()

const app:Application=express()
const PORT:Number=8003
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const notificationRoute = notificationRouter(dependancies);
app.use('/api/notification',notificationRoute)


app.listen(PORT,()=>{
    console.log('notification service running at',PORT);
    
})
export default app;