import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import * as cors from 'cors'
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  dotenv.config()
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    origin:'https://e-tutor-umber.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }
  app.use(cors(corsOptions))
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8085);
}
bootstrap();
