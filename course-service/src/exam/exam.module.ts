import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from 'src/schema/course.model';
import { Exam, ExamSchema } from 'src/schema/exam.model';
import { ExamResult, ExamResultSchema } from 'src/schema/examResult.model';

@Module({
  imports:[MongooseModule.forFeature([{name:Exam.name,schema:ExamSchema}]),
  MongooseModule.forFeature([{name:ExamResult.name,schema:ExamResultSchema}])
],
  providers: [ExamService],
  controllers: [ExamController]
})
export class ExamModule {}
