import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { KafkaModule } from './kafka/kafka.module';
import 'dotenv/config'


@Module({
  imports: [
    UserModule,
    AuthModule,
    MongooseModule.forRoot(process.env.DB_URL),
    KafkaModule
    ],
  providers: [],
  
})
export class AppModule {}
