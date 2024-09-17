import { Consumer, Kafka, Producer } from "kafkajs"

const kafka = new Kafka({
    clientId: 'auth-client',
    brokers: ['pkc-xrnwx.asia-south2.gcp.confluent.cloud:9092'],
    ssl: true,
    sasl: {
      mechanism: 'plain',
      username: '4T6M65RRFRWERULZ',
      password: 'GSpvwMVLNiwEjytWfbNnRkJV9oequFuSY8Bii0jaMHbHG9b/GOHBHRtdBt5YqzGD'
    }
  });

export const producer:Producer = kafka.producer();
export const consumer:Consumer=kafka.consumer({
    groupId:'auth-service-kafka-group'
})

