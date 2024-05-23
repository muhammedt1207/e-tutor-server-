import { INotificationSubsciber, createSubscriber } from "../infrastructure/kafka";
import { consumer } from '@/infrastructure/kafka';

export const startConsumer = async () => {
    try {
        await consumer.connect();
        console.log('Consumer connected');

        await consumer.subscribe({
            topic: "notification-service-topic",
            fromBeginning: true
        });
    
        console.log('Consumer subscribed');

        const subscriber = createSubscriber(); // Remove any arguments here

        await consumer.run({
            eachMessage: async ({ message }) => {
                const { key, value } = message;
                const subscriberMethod = String(key) as keyof INotificationSubsciber;
                const subscriberData = JSON.parse(String(value));

                try {
                    if (subscriberMethod in subscriber) {
                        await subscriber[subscriberMethod](subscriberData);
                        console.log(`Method '${subscriberMethod}' executed successfully`);
                    } else {
                        throw new Error(`Method '${subscriberMethod}' not found in subscriber`);
                    }
                } catch (error: any) {
                    console.error(`Error calling method '${subscriberMethod}':`, error);
                    throw error;
                }
            }
        });
    } catch (error: any) {
        throw new Error("Kafka consumer error: " + error?.message);
    }
};

export const stopConsumer = async () => {
    try {
        await consumer.stop();
        await consumer.disconnect();
        console.log('Consumer stopped and disconnected');
    } catch (error: any) {
        console.error("Error stopping Kafka consumer:", error.message);
    }
};
