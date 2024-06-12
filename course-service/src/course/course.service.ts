import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { log } from 'console';
import { Model } from 'mongoose';
import { Course } from 'src/schema/course.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose'; // Add Types import

@Injectable()
export class CourseService {
    constructor(@InjectModel(Course.name) private courseModel: Model<Course>) { }
    
    async addCourse(CourseData: any): Promise<Course | null> {
      try {
          const CourseDatas = {
              instructorName: CourseData.instructorData.instructorName || 'Muhammed',
              instructorRef: CourseData.instructorData.instructorRef,
              title: CourseData.addCourseData.title,
              subtitle: CourseData.addCourseData.subtitle,
              category: CourseData.addCourseData.category,
              topic: CourseData.addCourseData.topic,
              thumbnail: CourseData.advanceInformationData.imageUrl,
              trailer: CourseData.advanceInformationData.videoUrl,
              description: CourseData.advanceInformationData.description,
              teachings: CourseData.advanceInformationData.teachings,
              lessons: CourseData.addCurriculumData.map(lesson => ({
                  ...lesson,
                  subLessons: lesson.subLessons.map(subLesson => ({
                      ...subLesson,
                      _id: new Types.ObjectId(),
                  }))
              })),
              instructure: CourseData.email,
              amount: CourseData.addCourseData.amount || ''
          }
  
          const createdCourse = new this.courseModel(CourseDatas);
          console.log(createdCourse, 'created course data maked');
          
          return createdCourse.save();
      } catch (error) {
          console.log(error, 'error in course adding');
          return null;
      }
  }
  

    async getAllCourse(): Promise < any | null > {
    try {
        const allCourse = await this.courseModel.find().sort({createdAt:-1}).populate('category')
            if(!allCourse) {
            throw new NotFoundException('Course not get');
        }
            return allCourse

    } catch(error) {
        console.log(error);

    }
}

async getAcceptedCourse(filters?: any) {
  try {
    const query: any = { isPublished: true, status: "accepted" };

    if (filters) {
      if (filters.category) {
        query.category = filters.category;
      }
      if (filters.instructor) {
        query.instructorRef = filters.instructor;
      }
      Object.assign(query, filters);
    }

    const courses = await this.courseModel
      .find(query)
      .sort({ createdAt: -1 })
      .populate('category');

    if (!courses) {
      throw new NotFoundException('course not found');
    }
    return courses;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async findOne(id: string): Promise<Course> {
    try {
      const course = await this.courseModel.findById(id).exec();
      if (!course) {
        throw new NotFoundException('Course not found');
      }
      console.log(course);
      
      return course;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve course');
    }
  }


  async update(id: string, CourseData: any): Promise<Course> {
    try {
        const updatedLessons = CourseData.addCurriculumData.map(lesson => ({
            ...lesson,
            subLessons: lesson.subLessons.map(subLesson => ({
                ...subLesson,
                _id: subLesson._id || new Types.ObjectId(), 
                video: subLesson.video || 'default_video_url'
            }))
        }));

        const CourseDatas = {
            instructorName: CourseData.instructorData.instructorName || 'Muhammed',
            instructorRef: CourseData.instructorData.instructorRef,
            title: CourseData.addCourseData.title,
            subtitle: CourseData.addCourseData.subtitle,
            category: CourseData.addCourseData.category,
            topic: CourseData.addCourseData.topic,
            thumbnail: CourseData.advanceInformationData.imageUrl,
            trailer: CourseData.advanceInformationData.videoUrl,
            description: CourseData.advanceInformationData.description,
            teachings: CourseData.advanceInformationData.teachings,
            lessons: updatedLessons,
            amount: CourseData.addCourseData.amount || ''
        };

        console.log(CourseDatas, 'Course data before saving...');

        const existingCourse = await this.courseModel.findById(id).exec();
        if (!existingCourse) {
            throw new NotFoundException('Course not found');
        }

        existingCourse.instructorRef = CourseDatas.instructorRef;
        existingCourse.title = CourseDatas.title;
        existingCourse.subtitle = CourseDatas.subtitle;
        existingCourse.category = CourseDatas.category;
        existingCourse.topic = CourseDatas.topic;
        existingCourse.thumbnail = CourseDatas.thumbnail;
        existingCourse.trailer = CourseDatas.trailer;
        existingCourse.description = CourseDatas.description;
        existingCourse.teachings = CourseDatas.teachings;
        existingCourse.lessons = CourseDatas.lessons;
        existingCourse.amount = CourseDatas.amount;

        return await existingCourse.save();
    } catch (error) {
        if (error instanceof NotFoundException) {
            throw error;
        }
        console.error('Failed to update course:', error);
        throw new InternalServerErrorException('Failed to update course');
    }
}


  async remove(id: string): Promise<void> {
    try {
      const result = await this.courseModel.deleteOne({ _id: id }).exec();
      if (result.deletedCount === 0) {
        throw new NotFoundException('Course not found');
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete course');
    }
  }

  async updateStatus(courseData: any): Promise<any> {
    try {
      const { id, action } = courseData;
      console.log(`Updating status for course with ID: ${id} and action: ${action}`);

      const course = await this.courseModel.findById(id).exec();
      if (!course) {
        console.log(`Course with ID: ${id} not found`);
        throw new NotFoundException('Course not found');
      }

      if (action === 'accept') {
        course.isPublished = true;
        course.status = 'accepted';
      } else if (action === 'reject') {
        course.isPublished = false;
        course.status = 'rejected';
      } else {
        console.log(`Invalid action: ${action}`);
        throw new InternalServerErrorException('Invalid action');
      }

      console.log(`Saving course: ${course}`);
      await course.save();

      console.log('Course saved successfully', course);
      return course;
    } catch (error) {
      console.error('Error updating course status:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update course status');
    }
  }

  async findCoursesByInstructor(instructorRef: string): Promise<Course[]> {
    try {      
      const courses = await this.courseModel.find({ instructorRef:instructorRef }).exec();
      if (!courses || courses.length === 0) {
        throw new NotFoundException('No courses found for the given instructor');
      }
      return courses;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve courses');
    }
  }
}
