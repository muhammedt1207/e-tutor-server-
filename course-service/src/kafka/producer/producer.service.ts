import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Message, Producer } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit {
  private kafka: Kafka;
  private producer: Producer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'auth-service',
      brokers: ['localhost:29092'], 
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