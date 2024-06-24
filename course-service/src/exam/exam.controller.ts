import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { ExamService } from './exam.service';

@Controller('exam')
export class ExamController {
    constructor(private readonly examService:ExamService){}


    @Post()
    async createExam(@Body() createExamDto:any , @Res() res){
        try {
            const ExamData=createExamDto
            console.log(ExamData)
            const newExam=await this.examService.addExam(ExamData)
            res.status(HttpStatus.OK).json({
                success:true,
                data:newExam,
                message:'exam added success'
            })
            
        } catch (error) {
         throw new Error("add exam error:"+error);
            
        }
    }

    @Get(':id')
    async getExamByCourseId(@Param('id') id:string, @Res() res){
        try {
            console.log(id);
            
            const exam=await this.examService.getExamWithCourseId(id)
            console.log(exam);
            
            res.status(HttpStatus.OK).json({
                success:true,
                data:exam,
                message:'Exam data'
            })
        } catch (error) {
            console.log(error);        
            throw new Error("Can't find exam");    
        }
    }

    @Post('submit')
    async submitExam(@Body() results: any, @Query('courseId') courseId: string, @Query('userId') userId: string, @Res() res) {
        try {
            console.log('Results:', results);
            console.log('Course ID:', courseId);
            console.log('User ID:', userId);

            // Call the service method to handle the exam submission
            const submissionResult = await this.examService.submitExam(userId,courseId,results);

            res.status(HttpStatus.OK).json({
                success: true,
                data: submissionResult,
                message: 'Exam submitted successfully'
            });
        } catch (error) {
            console.error('Error submitting exam:', error);
            throw new Error("Error submitting exam");
        }
    }
}
