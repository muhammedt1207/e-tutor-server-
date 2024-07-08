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
      clientId: 'course-client',
      brokers: ['pkc-4j8dq.southeastasia.azure.confluent.cloud:9092'],
      ssl: true,
      sasl: {
        mechanism: 'plain',
        username: 'XXP3WYF5WBDQBUC5',
        password: 'ccDWKkS1gr0SZkJ1o6ieY6yY2XqRF0YJAawrk51H+78pA7QvPZE+K4LWA2V12srE'
      }
    });
    this.consumer = this.kafka.consumer({ groupId: 'course-service' });
  }

  async onModuleInit() {
    await this.consumer.connect();
    console.log('consumer connected✅');

    await this.consumer.subscribe({ topic: 'course-service', fromBeginning: true });
    await this.consumer.run({
      eachMessage: async (payload: EachMessagePayload) => {
        console.log(payload, 'payload,,,');

        const message = payload.message.value.toString();
        const data = JSON.parse(message);
        console.log('Received message:', data);

        const existingEnrollment = await this.enrollmentModel.findOne(data);
        if (!existingEnrollment) {
          const enrollment = new this.enrollmentModel(data);
          await enrollment.save();
          console.log('Enrollment saved successfully!');
        } else {
          console.log('Enrollment already exists, skipping save.');
        }
      },
    });
    console.log('Consumer running ');
  }
}
