import { Module } from '@nestjs/common';
import { ReviewAndRatingService } from './review-and-rating.service';
import { ReviewAndRatingController } from './review-and-rating.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from 'src/schema/review.model';

@Module({
  imports:[
    MongooseModule.forFeature([{name:Review.name,schema:ReviewSchema}])
  ],
  providers: [ReviewAndRatingService],
  controllers: [ReviewAndRatingController]
})
export class ReviewAndRatingModule {}
