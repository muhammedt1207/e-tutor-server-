import { Module, forwardRef } from '@nestjs/common';
import { ConsumerService } from './consumer/consumer.service';
import { CourseModule } from 'src/course/course.module';
import { EnrollmentModule } from 'src/enrollment/enrollment.module';

@Module({
  imports: [
    forwardRef(() => CourseModule),
    EnrollmentModule, 
  ],
  providers: [ConsumerService],
  exports: [ConsumerService],
})
export class KafkaModule {}