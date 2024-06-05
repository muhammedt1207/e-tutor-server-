// dto/create-review.dto.ts
import { IsString, IsNumber, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateReviewDto {
 
  @IsNotEmpty()
  readonly userId: string;


  @IsNotEmpty()
  readonly courseId: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  readonly rating: number;

  @IsString()
  @IsNotEmpty()
  readonly text: string;
}
