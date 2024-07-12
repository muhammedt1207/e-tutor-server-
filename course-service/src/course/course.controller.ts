import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus, Res, NotFoundException, Query } from '@nestjs/common';
import { CourseService } from './course.service';
import { NotFoundError } from 'rxjs';

@Controller('/course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async create(@Body() createCourseDto: any, @Res() res): Promise<void> {
    try {
      console.log(createCourseDto.addCurriculumData,'------------------------------------------------');
      
      const course = await this.courseService.addCourse(createCourseDto);
      console.log(course,'course created result');
      
      res.status(HttpStatus.CREATED).json({
        success: true,
        data: course,
        message: 'Course created successfully',
      });
    } catch (error) {
      console.log(error);
      
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to create course',
      });
    }
  }

  @Get('/acceptedCourses')
async findAcceptedCourse(@Res() res, @Query() filters) {
  try {
    console.log(filters,'filterss....');
    
    const result = await this.courseService.getAcceptedCourse(filters);
    if (!result) {
      throw new NotFoundException('course not found');
    }
    res.status(200).json({
      success: true,
      data: result,
      message: 'All published courses'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching courses'
    });
  }
}

  @Get()
  async findAll(@Res() res): Promise<void> {
    try {
      const courses = await this.courseService.getAllCourse();
      res.status(HttpStatus.OK).json({
        success: true,
        data: courses,
        message: 'Courses retrieved successfully',
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to retrieve courses',
      });
    }
  }
  @Get('/instructor/:instructorRef')
  async findByInstructor(@Param('instructorRef') instructorRef: string, @Res() res): Promise<void> {
    try {
      console.log(instructorRef,'===0==0=0=0=0=0=0=0=0');
      
      const courses = await this.courseService.findCoursesByInstructor(instructorRef);
      console.log();
      
      res.status(HttpStatus.OK).json({
        success: true,
        data: courses,
        message: 'Courses retrieved successfully',
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: 'No courses found for the given instructor',
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: 'Failed to retrieve courses',
        });
      }
    }
  }
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res): Promise<void> {
    try {
      console.log(id,'course id');
      
      const course = await this.courseService.findOne(id);
      if (!course) {
        res.status(HttpStatus.NOT_FOUND).json({
          success: false,

          message: 'Course not found',
        });
      } else {
        res.status(HttpStatus.OK).json({
          success: true,
          data: course,
          message: 'Course retrieved successfully',
        });
      }
    } catch (error) {
      console.log(error);
      
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to retrieve course',
      });
    }
  }

  @Put('/updateStatus')
  async updateStatus(@Body() createCourseDto: any, @Res() res): Promise<void> {
    try {
        console.log(createCourseDto.addCurriculumData,'updateStatus data');
        
      const course = await this.courseService.updateStatus(createCourseDto);
      console.log(course,'course created result');
      
      res.status(HttpStatus.CREATED).json({
        success: true,
        data: course,
        message: 'Course created successfully',
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to create course',
      });
    }
  }

  @Put('editCourse/:id')
  async update(@Param('id') id: string, @Body() updateCourseDto: any, @Res() res): Promise<void> {
    try {
      console.log(id,'editing course data');
      console.log(updateCourseDto,'editing dataaasssssssssss......');
      
      const course = await this.courseService.update(id, updateCourseDto);
      console.log(course,'course data by updated.......................................');
      
      res.status(HttpStatus.OK).json({
        success: true,
        data: course,
        message: 'Course updated successfully',
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to update course',
      });
    }
  }


  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @Res() res): Promise<void> {
    try {
      await this.courseService.remove(id);
      res.status(HttpStatus.NO_CONTENT).json({
        success: true,
        message: 'Course deleted successfully',
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to delete course',
      });
    }
  }
}
