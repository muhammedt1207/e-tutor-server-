import { Consumer, Kafka, Producer } from "kafkajs"

export const kafka =new Kafka({
    clientId:'auth-service',
    brokers:['  ']
})

export const producer:Producer = kafka.producer();
export const consumer:Consumer=kafka.consumer({
    groupId:'auth-service-kafka-group'
})

