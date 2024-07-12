import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  dotenv.config()
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix("/api/course")
  await app.listen(8085);
}
bootstrap();
