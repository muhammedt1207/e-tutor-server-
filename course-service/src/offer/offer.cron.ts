import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, Offer } from 'src/schema/course.model';

@Injectable()
export class OfferCron implements OnModuleInit {
  private readonly logger = new Logger(OfferCron.name);

  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  onModuleInit() {
    this.logger.log('OfferCron service initialized');
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async checkOfferEndDate() {
    this.logger.log('Checking offers...');
    try {
      const currentDate = new Date();
      const expiredOffers = await this.courseModel.find({
        'offerDetails.endDate': { $lt: currentDate },
        isOfferOngoing: true,
      });

      if (expiredOffers.length > 0) {
        for (const course of expiredOffers) {
          course.isOfferOngoing = false;
          course.amount=course.fixedAmount
          course.offerDetails = new Offer({
            offer: 0,
            startDate: null,
            endDate: null,
          });
          await course.save();
          this.logger.log(`Offer expired for course: ${course.title}`);
        }
      } else {
        this.logger.log('No expired offers found');
      }
    } catch (error) {
      this.logger.error('Error checking offer end date:', error);
    }
  }
}
