import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';
import { ReviewAndRatingService } from './review-and-rating.service';
import { Review } from 'src/schema/review.model';
import { CreateReviewDto } from 'src/dto/create-review.dto';
import { Response } from 'express';

@Controller('reviews')
export class ReviewAndRatingController {
  constructor(private readonly reviewAndRatingService: ReviewAndRatingService) {}

  @Get(':courseId')
  async getReviewsByCourse(@Param('courseId') courseId: string, @Res() res: Response) {
    try {
      console.log(courseId, 'course id for reviews');
      const reviews = await this.reviewAndRatingService.getReviewsByCourse(courseId);
      console.log(reviews, 'all reviews based on the course');

      res.status(200).json({
        success: true,
        data: reviews,
        message: 'Reviews fetched successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  @Post()
  createReview(@Body() createReviewDto: CreateReviewDto) {
    console.log(createReviewDto, 'review datas');
    return this.reviewAndRatingService.createReview(createReviewDto);
  }
}