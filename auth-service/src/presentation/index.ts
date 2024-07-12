import express,{Request,Response,Application} from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { router } from '../infrastructure/routes';
import { dependancies } from '../_boot/dependencies';
import morgan from 'morgan'
import { errorHandler } from '_lib/http/common/error';
dotenv.config();


const app:Application =express();
const PORT:number=Number(process.env.port)||8081


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(morgan('dev'))

app.use('/api/auth',router(dependancies))
// app.use('/',router(dependancies))


app.use("*",(req: Request, res: Response) => {
    res.status(404).json({ success: false, status: 404, message: "Api Not found" });
  });  
app.use(errorHandler)
app.listen(PORT,()=>{
    console.log("Auth server Running On PORT: ",PORT)
})

export default app;