import { Module, forwardRef } from '@nestjs/common';
import { ConsumerService } from './consumer/consumer.service';
import { CourseModule } from 'src/course/course.module';
import { EnrollmentModule } from 'src/enrollment/enrollment.module';
import { ProducerService } from './producer/producer.service';

@Module({
  imports: [
    forwardRef(() => CourseModule),
    EnrollmentModule, 
  ],
  providers: [ConsumerService, ProducerService],
  exports: [ConsumerService,ProducerService],
})
export class KafkaModule {}