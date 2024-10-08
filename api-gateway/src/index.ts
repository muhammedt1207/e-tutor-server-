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


const allowedOrigins = ['https://e-tutor-umber.vercel.app'].filter(Boolean) as string[];
const corsOptions={
    origin:allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials:true
}
app.use(cors(corsOptions))



const routeConfigs = [
    { path: '/auth', destinationUrl:process.env.AUTH_URL  },
    { path:'/user'  ,destinationUrl:process.env.USER_URL},
    {path:'/course',destinationUrl:process.env.COURSE_URL},
    {path:'/payment',destinationUrl:process.env.PAYMENT_URL},
    {path:'/chat',destinationUrl:process.env.CHAT_URL}
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