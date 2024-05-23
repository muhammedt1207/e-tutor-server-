import { Module } from '@nestjs/common';

import { CategoryModule } from './category/category.module';
import { CourseModule } from './course/course.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsumerService } from './kafka/consumer/consumer.service';
import { KafkaModule } from './kafka/kafka.module';
import { EnrollmentService } from './enrollment/enrollment.service';
import { EnrollmentModule } from './enrollment/enrollment.module';
import 'dotenv/config'

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URL),   CategoryModule, CourseModule, KafkaModule, EnrollmentModule,],
  controllers: [],
  providers: [ConsumerService, EnrollmentService],
})
export class AppModule {}
