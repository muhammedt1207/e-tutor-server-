import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Course } from 'src/schema/course.model';

@Injectable()
export class OfferService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async addOrUpdateOffer(courseId: string, offerDetails: any): Promise<Course> {
    const course = await this.courseModel.findById(courseId);

    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    if (offerDetails.Offer < 0 || offerDetails.Offer > 100) {
      throw new BadRequestException('Offer percentage must be between 0 and 100');
    }

    course.offerDetails = offerDetails;
    course.isOfferOngoing = true;
    const discountPercentage = offerDetails.offer / 100;
    course.amount=Math.floor(course.fixedAmount - (course.fixedAmount * discountPercentage))
    console.log(course.amount);
    
    return await course.save();
  }
}
