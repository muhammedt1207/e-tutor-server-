import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from 'src/schema/course.model';
import { OfferCron } from './offer.cron';

@Module({
  imports:[MongooseModule.forFeature([{name:Course.name,schema:CourseSchema}])],
  providers: [OfferService,OfferCron],
  controllers: [OfferController]
})
export class OfferModule {}
