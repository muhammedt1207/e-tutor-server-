import {Kafka,Producer,Consumer} from 'kafkajs'

export const kafka = new Kafka({
    clientId:'auth-service',
    brokers:['localhost:29092']
})

export const producer:Producer = kafka.producer()
export const consumer:Consumer = kafka.consumer({
    groupId:'notification-service-kafka-group'
})

export * from './subscribe'