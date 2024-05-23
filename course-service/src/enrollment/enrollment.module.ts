import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Enrollment, EnrollmentSchema } from 'src/schema/enrollment.model';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Enrollment.name, schema: EnrollmentSchema }]),
  ],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
  exports: [MongooseModule, EnrollmentService],
})
export class EnrollmentModule {}
