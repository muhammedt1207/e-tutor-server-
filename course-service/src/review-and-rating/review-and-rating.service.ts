import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from 'src/schema/review.model'; 
import { CreateReviewDto } from 'src/dto/create-review.dto';

@Injectable()
export class ReviewAndRatingService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}

  async getReviewsByCourse(courseId: string): Promise<Review[]> {
    try {
      const reviews = await this.reviewModel.find({ courseId: courseId }).exec();
      console.log(reviews);
      if (!reviews || reviews.length === 0) {
        throw new NotFoundException(`Reviews for course ${courseId} not found`);
      }
      
      return reviews;
    } catch (error) {
      throw new InternalServerErrorException(`Failed to retrieve reviews: ${error.message}`);
    }
  }

  async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    try {
      const createdReview = new this.reviewModel(createReviewDto);
      return await createdReview.save();
    } catch (error) {
      throw new Error(`Failed to create review: ${error.message}`);
    }
  }

}
