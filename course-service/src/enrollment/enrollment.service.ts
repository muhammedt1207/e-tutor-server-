import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from 'src/schema/course.model';
import { Enrollment } from 'src/schema/enrollment.model';

@Injectable()
export class EnrollmentService {
  constructor(@InjectModel('Enrollment') private enrollmentModel: Model<Enrollment>,
  @InjectModel('Course') private courseModel:Model<Course>
) {}
 
async updateProgress(progressData: any): Promise<Enrollment> {
  try {
    const enrollment = await this.enrollmentModel.findOne({
      userId: progressData.userId,
      courseId: progressData.courseId,
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    const currentLesson = enrollment.progress.currentLesson;
    const currentSubLesson = enrollment.progress.currentSubLesson;

    if (currentLesson && currentSubLesson) {
      const isCompleted = enrollment.progress.completedLessons.some(
        (lesson) => 
          lesson.lessonId.toString() === currentLesson.toString() && 
          lesson.subLessonId.toString() === currentSubLesson.toString()
      );

      if (!isCompleted) {
        enrollment.progress.completedLessons.push({
          lessonId: currentLesson,
          subLessonId: currentSubLesson,
        });
      }
    }

    enrollment.progress.currentLesson = progressData.progress.lessonId;
    enrollment.progress.currentSubLesson = progressData.progress.subLessonId;

    await enrollment.save();

    console.log(enrollment);
    return enrollment;
  } catch (error) {
    throw new InternalServerErrorException('Failed to update progress', error.message);
  }
}




  async isUserEnrolled(courseId: string, userId: string){
    try {
      const enrollment = await this.enrollmentModel.findOne({
        courseId:courseId,
        userId:userId})
      console.log(enrollment);
      if(enrollment){
        return [true,enrollment]
      }else{
        return [false,enrollment]; 
      }
    } catch (error) {
      console.error('Error checking enrollment:', error);
      throw new InternalServerErrorException('Failed to check enrollment');
    }
  }


  async getPurchasedCourses(userId:string){
    try {
      const courses=await this.enrollmentModel.find({userId:userId}).populate('courseId').exec()
      if(!courses){
        throw new NotFoundException('Enrollment Not Found')
      }
      console.log(courses);
      return courses
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to find enrollment');
      
    }
  }

  async getEnrollmentsForInstructorOverTime(instructorRef: string) {
    const enrollments = await this.enrollmentModel.aggregate([
      {
        $lookup: {
          from: 'courses',
          localField: 'courseId',
          foreignField: '_id',
          as: 'course',
        },
      },
      { $unwind: '$course' },
      { $match: { 'course.instructorRef': instructorRef } },
      {
        $group: {
          _id: {
            year: { $year: '$enrolledAt' },
            month: { $month: '$enrolledAt' },
            day: { $dayOfMonth: '$enrolledAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } },
    ]);
    console.log(enrollments,'total enrollments');
    
    return enrollments;
  }

  async getTopInstructors() {
    const topInstructors = await this.enrollmentModel.aggregate([
      {
        $lookup: {
          from: 'courses',
          localField: 'courseId',
          foreignField: '_id',
          as: 'course',
        },
      },
      { $unwind: '$course' },
      {
        $group: {
          _id: '$course.instructorRef',
          totalEnrollments: { $sum: 1 },
        },
      },
      { $sort: { totalEnrollments: -1 } },
      { $limit: 5 },
    ]);

    console.log(topInstructors, 'top instructors');
    return topInstructors;
  }

  async getTopCourses() {
    const [topCourses, totalCourseCount] = await Promise.all([
      this.enrollmentModel.aggregate([
        {
          $group: {
            _id: '$courseId',
            totalEnrollments: { $sum: 1 },
          },
        },
        { $sort: { totalEnrollments: -1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: 'courses',
            localField: '_id',
            foreignField: '_id',
            as: 'course',
          },
        },
        { $unwind: '$course' },
      ]),
      this.courseModel.countDocuments({}).then((count) => count),
    ]);
  
    console.log(topCourses, 'top courses');
    console.log('Total courses:', totalCourseCount);
    return { topCourses, totalCourseCount };
  }


  async getSalesReport(startDate: string, endDate: string) {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      const salesReport = await this.enrollmentModel.aggregate([
        {
          $match: {
            enrolledAt: {
              $gte: start,
              $lte: end
            }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: '$enrolledAt' },
              month: { $month: '$enrolledAt' },
              day: { $dayOfMonth: '$enrolledAt' },
            },
            totalSales: { $sum: 1 },
            courses: { $push: '$courseId' }
          }
        },
        {
          $lookup: {
            from: 'courses',
            localField: 'courses',
            foreignField: '_id',
            as: 'courseDetails'
          }
        },
        {
          $addFields: {
            totalProfit: { $sum: '$courseDetails.amount' }
          }
        },
        { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
      ]);
  
      console.log(salesReport, 'sales report');
      return salesReport;
    } catch (error) {
      console.error('Error generating sales report:', error);
      throw new InternalServerErrorException('Failed to generate sales report');
    }
  }

  
  async getTopCoursesForInstructor(instructorRef: string) {
    try {
      const topCoursesForInstructor = await this.enrollmentModel.aggregate([
        {
          $lookup: {
            from: 'courses',
            localField: 'courseId',
            foreignField: '_id',
            as: 'course',
          },
        },
        { $unwind: '$course' },
        { $match: { 'course.instructorRef': instructorRef } },
        {
          $group: {
            _id: '$courseId',
            totalEnrollments: { $sum: 1 },
          },
        },
        { $sort: { totalEnrollments: -1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: 'courses',
            localField: '_id',
            foreignField: '_id',
            as: 'course',
          },
        },
        { $unwind: '$course' },
      ]);

      console.log(topCoursesForInstructor, 'top courses for instructor');
      return topCoursesForInstructor;
    } catch (error) {
      console.error('Error fetching top courses for instructor:', error);
      throw new InternalServerErrorException('Failed to fetch top courses for instructor');
    }
  }
  async getTotalCoursesForInstructor(instructorRef: string) {
    try {
      const totalCourses = await this.enrollmentModel.aggregate([
        {
          $lookup: {
            from: 'courses',
            localField: 'courseId',
            foreignField: '_id',
            as: 'course',
          },
        },
        { $unwind: '$course' },
        { $match: { 'course.instructorRef': instructorRef } },
        {
          $group: {
            _id: null,
            totalCourses: { $addToSet: '$courseId' },
          },
        },
        {
          $project: {
            totalCourses: { $size: '$totalCourses' },
          },
        },
      ]);

      console.log(totalCourses, 'total courses for instructor');
      return totalCourses.length ? totalCourses[0].totalCourses : 0;
    } catch (error) {
      console.error('Error fetching total courses for instructor:', error);
      throw new InternalServerErrorException('Failed to fetch total courses for instructor');
    }
  }

  async getTotalStudentsForInstructor(instructorRef: string) {
    try {
      const totalStudents = await this.enrollmentModel.aggregate([
        {
          $lookup: {
            from: 'courses',
            localField: 'courseId',
            foreignField: '_id',
            as: 'course',
          },
        },
        { $unwind: '$course' },
        { $match: { 'course.instructorRef': instructorRef } },
        {
          $group: {
            _id: null,
            totalStudents: { $addToSet: '$userId' },
          },
        },
        {
          $project: {
            totalStudents: { $size: '$totalStudents' },
          },
        },
      ]);

      console.log(totalStudents, 'total students for instructor');
      return totalStudents.length ? totalStudents[0].totalStudents : 0;
    } catch (error) {
      console.error('Error fetching total students for instructor:', error);
      throw new InternalServerErrorException('Failed to fetch total students for instructor');
    }
  }

  async getEnrollments() {
    try {
      const enrollments = await this.enrollmentModel.aggregate([
        {
          $lookup: {
            from: 'courses',
            localField: 'courseId',
            foreignField: '_id',
            as: 'course',
          },
        },
        { $unwind: '$course' },
        {
          $lookup: {
            from: 'categories',
            localField: 'course.category',
            foreignField: '_id',
            as: 'category',
          },
        },
        { $unwind: '$category' },
        {
          $group: {
            _id: {
              categoryName: '$category.categoryName',
              year: { $year: '$enrolledAt' },
              month: { $month: '$enrolledAt' },
              day: { $dayOfMonth: '$enrolledAt' },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } },
      ]);

      console.log(enrollments, 'enrollments by category and date');
      return enrollments;
    } catch (error) {
      console.error('Error fetching enrollments by category and date:', error);
      throw new InternalServerErrorException('Failed to fetch enrollments by category and date');
    }
  }
}
