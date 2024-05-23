import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'



async function bootstrap() {
  dotenv.config()
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  console.log('server running on port number 8083');
  
  await app.listen(8083);
}
bootstrap();
