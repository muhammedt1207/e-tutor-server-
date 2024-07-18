import { Module, forwardRef } from '@nestjs/common';
import { ConsumerService } from './consumer/consumer.service';
import { CourseModule } from 'src/course/course.module';
import { EnrollmentModule } from 'src/enrollment/enrollment.module';
import { ProducerService } from './producer/producer.service';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.mode';
import { Enrollment, EnrollmentSchema } from 'src/schema/enrollment.model';
import { Connection } from 'mongoose';

@Module({
  imports: [
    forwardRef(() => CourseModule),
    EnrollmentModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Enrollment.name, schema: EnrollmentSchema },
    ]),
  ],
  providers: [
    ConsumerService,
    ProducerService,
    {
      provide: 'UserModel',
      useFactory: (connection: Connection) => connection.model(User.name, UserSchema),
      inject: [getConnectionToken()],
    },
    {
      provide: 'EnrollmentModel',
      useFactory: (connection: Connection) => connection.model(Enrollment.name, EnrollmentSchema),
      inject: [getConnectionToken()],
    },
  ],
  exports: [ConsumerService, ProducerService],
})
export class KafkaModule {}