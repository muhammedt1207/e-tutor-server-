import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Message, Producer } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit {
  private kafka: Kafka;
  private producer: Producer;

  constructor() {
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
  }

  async onModuleInit() {
    this.producer = this.kafka.producer();
    await this.producer.connect();
    console.log('produser connected♻♻🔁🔁');
    
  }

  async sendMessage(topic: string, key: string, message: {}) {
    const messagesWithKey: Message[] = [
      {
        key: key,
        value:JSON.stringify(message),
      },
    ];

    await this.producer.send({
      topic,
      messages: messagesWithKey,
    });
    console.log('message sended⬆✔🟢',topic,messagesWithKey);
    
}}