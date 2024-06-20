import { Consumer, Kafka, Producer } from "kafkajs"

export const kafka =new Kafka({
    clientId:'chat-service',
    brokers:['localhost:29092']
})

export const producer:Producer = kafka.producer();
export const consumer:Consumer=kafka.consumer({
    groupId:'chat-service-kafka-group'
})

