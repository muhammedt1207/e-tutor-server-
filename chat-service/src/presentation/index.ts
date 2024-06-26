import express,{Request,Response,NextFunction,Application} from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { router } from '../infrastructure/routes';
import { dependancies } from '../_boot/dependencies';
import morgan from 'morgan'
import errorhandler  from '../_lib/errorHandler/errorhandler'
import connectSocketIo from '@/infrastructure/socket';
import http from 'http'
import cors from 'cors'
dotenv.config();


const app:Application =express();
const PORT:number=Number(process.env.port)||8087


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(morgan('dev'))
const server =http.createServer(app)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
connectSocketIo(server)
app.use('/',router(dependancies))


app.use("*",(req: Request, res: Response) => {
    res.status(404).json({ success: false, status: 404, message: "Api Not found" });
  });  
app.use(errorhandler)
server.listen(PORT,()=>{
    console.log("Chat server Running On PORT: ",PORT)
})

export default app;