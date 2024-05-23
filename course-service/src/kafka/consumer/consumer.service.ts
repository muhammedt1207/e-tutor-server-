import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enrollment } from 'src/schema/enrollment.model';

@Injectable()
export class ConsumerService implements OnModuleInit {
  private kafka: Kafka;
  private consumer: Consumer;

  constructor(@InjectModel(Enrollment.name) private enrollmentModel: Model<Enrollment>) {
    this.kafka = new Kafka({
      clientId: 'course-service',
      brokers: ['localhost:29092'],
    });
    this.consumer = this.kafka.consumer({ groupId: 'course-service' });
  }

  async onModuleInit() {
    await this.consumer.connect();
    console.log('consumer connected✅🌐');
    
    await this.consumer.subscribe({ topic: 'course-service', fromBeginning: true });
    await this.consumer.run({
      eachMessage: async (payload: EachMessagePayload) => {
        console.log(payload,'payload,,,');
        
        const message = payload.message.value.toString();
        const data = JSON.parse(message);
        console.log('Received message:', data);

        const enrollment = new this.enrollmentModel(data);
        await enrollment.save();
      },
    });
    console.log('Consumer running 🚀');
  }
}