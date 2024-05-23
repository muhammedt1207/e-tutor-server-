import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enrollment } from 'src/schema/enrollment.model';

@Injectable()
export class EnrollmentService {
  constructor(@InjectModel('Enrollment') private enrollmentModel: Model<Enrollment>) {}

  async isUserEnrolled(courseId: string, userId: string): Promise<boolean> {
    try {
      const enrollment = await this.enrollmentModel.findOne({courseId: courseId, userId:userId }).exec();
      console.log(enrollment);
      
      return !!enrollment; 
    } catch (error) {
      console.error('Error checking enrollment:', error);
      throw new InternalServerErrorException('Failed to check enrollment');
    }
  }
}
