import {Kafka,Producer,Consumer} from 'kafkajs'

const kafka = new Kafka({
    clientId: 'notification-client',
    brokers: ['pkc-4j8dq.southeastasia.azure.confluent.cloud:9092'],
    ssl: true,
    sasl: {
      mechanism: 'plain',
      username: 'XXP3WYF5WBDQBUC5',
      password: 'ccDWKkS1gr0SZkJ1o6ieY6yY2XqRF0YJAawrk51H+78pA7QvPZE+K4LWA2V12srE'
    }
  });

export const producer:Producer = kafka.producer()
export const consumer:Consumer = kafka.consumer({
    groupId:'notification-service-kafka-group'
})

export * from './subscribe'