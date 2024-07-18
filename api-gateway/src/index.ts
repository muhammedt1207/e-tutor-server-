import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import proxy from 'express-http-proxy'
import morgan from 'morgan'
import { config } from 'dotenv'
config();
const app=express()
const PORT:number=8080

app.use(express.json())
app.use(cookieParser())
app.use(morgan('tiny'))


const allowedOrigins = ['http://localhost:5173'].filter(Boolean) as string[];
const corsOptions={
    origin:allowedOrigins,
    credentials:true
}
app.use(cors(corsOptions))



const routeConfigs = [
    { path: '/api/auth', destinationUrl: 'http://localhost:8081/' },
    { path:'/api/user'  ,destinationUrl:"http://localhost:8081"},
    {path:'/api/course',destinationUrl:process.env.COURSE_URL},
    {path:'/api/payment',destinationUrl:process.env.PAYMENT_URL},
    {path:'/api/chat',destinationUrl:process.env.CHAT_URL}
];
console.log(routeConfigs);

routeConfigs.forEach(route => {
    if (route.destinationUrl) {
        app.use(route.path, proxy(route.destinationUrl));
    }
});



app.listen(PORT,()=>{
    console.log("server running on port :",PORT)
})