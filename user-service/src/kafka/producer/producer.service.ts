import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Message, Producer } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit {
  private kafka: Kafka;
  private producer: Producer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'user-client',
      brokers: ['pkc-4j8dq.southeastasia.azure.confluent.cloud:9092'],
      ssl: true,
      sasl: {
        mechanism: 'plain',
        username: 'XXP3WYF5WBDQBUC5',
        password: 'ccDWKkS1gr0SZkJ1o6ieY6yY2XqRF0YJAawrk51H+78pA7QvPZE+K4LWA2V12srE'
      }
    });
  }

  async onModuleInit() {
    this.producer = this.kafka.producer();
    await this.producer.connect();
    console.log('produser connected♻♻🔁🔁');
    
  }

  async sendMessage(topic: string, key: string, message: string) {
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
    console.log('message sended⬆✔🟢',messagesWithKey);
    
}}