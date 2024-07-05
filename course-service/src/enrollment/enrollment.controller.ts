import { Controller, Get, Query, Res, HttpStatus, Param, HttpException, Req, Body, Put, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { NotFoundError } from 'rxjs';
import { Request, Response } from 'express';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Get('check')
  async checkEnrollment(@Query('courseId') courseId: string, @Query('userId') userId: string, @Res() res): Promise<void> {
    try {
        console.log(courseId,userId,'query dataaasss');
        
      const isEnrolled = await this.enrollmentService.isUserEnrolled(courseId, userId);
      console.log(isEnrolled,'-----------');
      
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
  @Get('/adminDashboard')
  async getAllDataForAdminDash() {
    try {
     const enrollmentData=await this.enrollmentService.getEnrollments()
      const topCourses=await this.enrollmentService.getTopCourses()
      return {
        success: true,
        data: {enrollmentData,topCourses},
        message: 'Enrollments retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve enrollments',
      };
    }
  }
  
    @Get('/salesReport')
    async getSalesReport(
      @Query('startDate') startDate: string,
      @Query('endDate') endDate: string,
      @Req() req: Request,
      @Res() res: Response
    ) {
      try {
        const data = await this.enrollmentService.getSalesReport(startDate, endDate);
        res.status(HttpStatus.OK).json({
          success: true,
          data: data,
          message: 'Sales report generated successfully',
        });
      } catch (error) {
        throw new HttpException('Failed to generate sales report', HttpStatus.INTERNAL_SERVER_ERROR);
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

    @Get('instrocterDash/:instructorRef')
    async getEnrollmentsForInstructor(
      @Param('instructorRef') instructorRef: string,
    ) {
      console.log(instructorRef,'instructer refrence ');
      
      try {
        const enrollments = await this.enrollmentService.getEnrollmentsForInstructorOverTime(
          instructorRef,
        );
        const topCourse = await this.enrollmentService.getTopCoursesForInstructor(instructorRef)
        const totalStudents=await this.enrollmentService.getTotalStudentsForInstructor(instructorRef)
        const totalCourses=await this.enrollmentService.getTotalCoursesForInstructor(instructorRef)
        return {
          success: true,
          data: {enrollments,topCourse,totalStudents,totalCourses},
          message: 'Enrollments retrieved successfully',
        };
      } catch (error) {
        console.log(error);
      
        return {
          success: false,
          message: 'Failed to retrieve enrollments',
        };
      }
    }

    @Put('progress')
    async updateProgress(
      @Body() progressData:any,@Res() Res
    ){
      try {
        console.log(progressData);
        
        if(!progressData.userId|| !progressData.courseId){
          throw new BadRequestException('user Id and course id are required')
        }

        const updatedProgress=await this.enrollmentService.updateProgress(progressData)

        Res.status(HttpStatus.OK).json({
          success:true,
          data:updatedProgress,
          message:'progress updated'
        })
      } catch (error) {
        throw new InternalServerErrorException(error.message)
      }
    }
}
