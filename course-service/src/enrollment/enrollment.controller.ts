import { Controller, Get, Query, Res, HttpStatus, Param } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { NotFoundError } from 'rxjs';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Get('check')
  async checkEnrollment(@Query('courseId') courseId: string, @Query('userId') userId: string, @Res() res): Promise<void> {
    try {
        console.log(courseId,userId,'query dataaasss');
        
      const isEnrolled = await this.enrollmentService.isUserEnrolled(courseId, userId);
      res.status(HttpStatus.OK).json({
        success: true,
        data: { isEnrolled },
        message: 'Enrollment status retrieved successfully',
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to check enrollment status',
      });
    }
  }
  @Get(':id')
  async purshasedCourse(@Param('id') id:string, @Res() res){
    try {
      console.log('user id:',id);
      const purchasedCourse=await this.enrollmentService.getPurchasedCourses(id)
    
      if(!purchasedCourse){
        throw new NotFoundError('purchased courses not found')
      }
      res.status(200).json({
        success:true,
        data:purchasedCourse,
        message:'purchased courses'
      })
      
    } catch (error) {
      
    }
  }
  
 
}
