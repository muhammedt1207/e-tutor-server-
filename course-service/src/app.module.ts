import { Module } from '@nestjs/common';

import { CategoryModule } from './category/category.module';
import { CourseModule } from './course/course.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsumerService } from './kafka/consumer/consumer.service';
import { KafkaModule } from './kafka/kafka.module';
import { EnrollmentService } from './enrollment/enrollment.service';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { ReviewAndRatingModule } from './review-and-rating/review-and-rating.module';
import { ExamModule } from './exam/exam.module';
import { OfferModule } from './offer/offer.module';
import { ScheduleModule } from '@nestjs/schedule';
import 'dotenv/config'
import { OfferCron } from './offer/offer.cron';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URL),ScheduleModule.forRoot(),   CategoryModule, CourseModule, KafkaModule, EnrollmentModule, ReviewAndRatingModule, ExamModule, OfferModule, UserModule,],
  controllers: [],
  providers: [ConsumerService, EnrollmentService,OfferCron],
})
export class AppModule {}
