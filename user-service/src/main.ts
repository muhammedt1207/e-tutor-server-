import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'
import * as cors from 'cors'


async function bootstrap() {
  dotenv.config()
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  const corsOptions = {
    origin:'https://e-tutor-server-api-gateway.onrender.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }
  app.use(cors(corsOptions))
  console.log('server running on port number 8083');
  await app.listen(8083);
}
bootstrap();
