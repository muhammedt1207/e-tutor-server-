import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './schema/user.model'; 
import { InstructorApplicationSchema } from './schema/instructor.model';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { KafkaModule } from 'src/kafka/kafka.module';
// import { ConsumerService } from 'src/kafka/consumer/consumer.service';

@Module({
  imports: [
    forwardRef(()=>KafkaModule),
    
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'InstructorApplication', schema: InstructorApplicationSchema },
    ]),
    AuthModule,   
  ],
  controllers: [UsersController],
  providers: [UsersService,JwtAuthGuard,JwtService,], 
})
export class UserModule {}
