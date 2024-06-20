import { Module, forwardRef } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from 'src/schema/course.model';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports:[MongooseModule.forFeature([{name:Course.name,schema:CourseSchema}]),forwardRef(()=>KafkaModule)],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
