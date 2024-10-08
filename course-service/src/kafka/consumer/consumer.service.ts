import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enrollment } from 'src/schema/enrollment.model';
import { User } from 'src/schema/user.mode'; 

@Injectable()
export class ConsumerService implements OnModuleInit {
  private kafka: Kafka;
  private consumer: Consumer;

  constructor(
    @Inject('EnrollmentModel') private enrollmentModel: Model<Enrollment>,
    @Inject('UserModel') private userModel: Model<User>,
  ) {
    this.kafka = new Kafka({
      clientId: 'course-client',
      brokers: ['pkc-xrnwx.asia-south2.gcp.confluent.cloud:9092'],
      ssl: true,
      sasl: {
        mechanism: 'plain',
        username: '4T6M65RRFRWERULZ',
        password: 'GSpvwMVLNiwEjytWfbNnRkJV9oequFuSY8Bii0jaMHbHG9b/GOHBHRtdBt5YqzGD'
      }
    });
    this.consumer = this.kafka.consumer({ groupId: 'course-service' });
  }

  async onModuleInit() {
    await this.consumer.connect();
    console.log('consumer connected✅');

    await this.consumer.subscribe({ topic: 'course-service', fromBeginning: true });
    await this.consumer.subscribe({ topic: 'notification-service-topic', fromBeginning: true });

    await this.consumer.run({
      eachMessage: async (payload: EachMessagePayload) => {
        const message = payload.message.value.toString();
        const data = JSON.parse(message);
        console.log('Received message:', data);
        console.log("message key:",payload.message.key.toString());
        
        if (payload.topic === 'course-service') {
          await this.handleCourseServiceMessage(data);
        } else if (payload.topic === 'notification-service-topic') {
          await this.handleNotificationServiceMessage(payload);
        }
      },
    });

    console.log('Consumer running');
  }

  private async handleCourseServiceMessage(data: any) {
    console.log('Handling course service message:', data);

    const existingEnrollment = await this.enrollmentModel.findOne(data);
    if (!existingEnrollment) {
      const enrollment = new this.enrollmentModel(data);
      await enrollment.save();
      console.log('Enrollment saved successfully!');
    } else {
      console.log('Enrollment already exists, skipping save.');
    }
  }

  private async handleNotificationServiceMessage(payload: any) {
    const message = payload.message.value.toString();
    const data = JSON.parse(message);
    console.log('Handling notification service message:', data);

    if (payload.message.key && payload.message.key.toString() === 'userCreated') {
      const existingUser = await this.userModel.findOne({ email: data.email });
      if (!existingUser) {
        const user = new this.userModel(data);
        await user.save();
        console.log('User saved successfully!');
      } else {
        console.log('User already exists, skipping save.');
      }
    }
  }
}
