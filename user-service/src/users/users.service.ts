import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InstructorApplication, InstructorApplicationDocument } from './schema/instructor.model';
import { User, UserDocument } from './schema/user.model';
import { ProducerService } from 'src/kafka/producer/producer.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(InstructorApplication.name) private readonly InstructorApplicationModel: Model<InstructorApplicationDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly producerService:ProducerService,
  ) { }

  async getAllInstructorsApplications(): Promise<InstructorApplication[] | null> {
    try {
      return await this.InstructorApplicationModel.find({ accepted: false }).exec();
    } catch (error) {
      throw new HttpException('Failed to fetch instructor applications', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }




  async getInstructorById(userId: string): Promise<InstructorApplication | null> {
    try {
      console.log('User id :', userId);
      const instructorData = await this.InstructorApplicationModel.findById(userId)
      if (!instructorData) {
        throw new HttpException('Failed to find instructor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return instructorData

    } catch (error) {
      throw new HttpException('Failed to find instructor', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async getAcceptedInstructors(): Promise<InstructorApplication[] | null> {
    try {
      return await this.InstructorApplicationModel.find({ accepted: true }).exec();
    } catch (error) {
      throw new HttpException('Failed to fetch instructor applications', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async addInstructorApplication(instructorData: any, userId: string): Promise<InstructorApplication | null> {
    try {
      console.log("User ID:", userId);
      console.log("Instructor Data:", instructorData);

      const existingApplication = await this.InstructorApplicationModel.findOne({ email: userId });
      console.log(existingApplication, 'existing application');

      if (existingApplication) {
        if (existingApplication.accepted) {
          throw new HttpException('You are already an instructor', HttpStatus.BAD_REQUEST);
        } else {
          throw new HttpException('You have already applied as an instructor', HttpStatus.BAD_REQUEST);
        }
      }

      const newInstructor = new this.InstructorApplicationModel({
        email: userId,
        profession: instructorData.profession,
        profileDescription: instructorData.profileDescription,
        linkedinLink: instructorData.linkedinLink,
        githubLink: instructorData.githubLink,
        address:instructorData.Address,
        idFileUrl:instructorData.idFileUrl,
        qualificationFileUrl:instructorData.qualificationFileUrl
      });
      console.log('instrcutor application aving....', newInstructor);

      return await newInstructor.save();

    } catch (error) {
      throw new HttpException('Failed to add instructor', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async acceptRequest(id: string, status: string): Promise<InstructorApplication | null> {
    try {
      const applicantData = await this.InstructorApplicationModel.findOne({ email: id });

      if (!applicantData) {
        throw new HttpException('Cannot find applicant', HttpStatus.BAD_REQUEST);
      }
      if (status == 'true') {
        applicantData.accepted = true;
        const updateData= await applicantData.save();      
        await this.producerService.sendMessage('instructor-accepted-topic','instructorAcceptence',id)
        await this.producerService.sendMessage('notification-service-topic','acceptInstructors',updateData.email)
        console.log('kafka messages sended');
        
        return updateData
      }
      
     return await applicantData.save()
      
    } catch (error) {
      throw new HttpException('Failed to accept request', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // async addUser(userData:any):Promise<User>{
  //   if(typeof userData !=='object'){
  //       throw new TypeError('user data must be an object')
  //   }
  //   const newUser =new this.userModel(userData)
  //   return newUser.save();
  // }

  async getInstructorByEmail(userEmail: string): Promise<InstructorApplication | null> {
    try {
      console.log('User id :', userEmail);
      const instructorData = await this.InstructorApplicationModel.findOne({email:userEmail})
      if (!instructorData) {
        throw new HttpException('Failed to find instructor', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return instructorData

    } catch (error) {
      throw new HttpException('Failed to find instructor', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}
