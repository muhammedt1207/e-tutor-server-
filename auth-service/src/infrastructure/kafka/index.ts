import { Consumer, Kafka, Producer } from "kafkajs"

const kafka = new Kafka({
    clientId: 'auth-client',
    brokers: ['pkc-41p56.asia-south1.gcp.confluent.cloud:9092'],
    ssl: true,
    sasl: {
      mechanism: 'plain',
      username: 'VLNLXJWK6RGUAVPV',
      password: 'aSPSOZ71Ksorv3qvBkuQZFR3ZxQ6h13TNXXEWMagufXLMjQuFmVlN0c3/c5jAr+Q'
    }
  });

export const producer:Producer = kafka.producer();
export const consumer:Consumer=kafka.consumer({
    groupId:'auth-service-kafka-group'
})

