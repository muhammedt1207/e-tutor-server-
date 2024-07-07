import { UserEntity } from 'domain/entities';
import { producer } from './../index';

export default async (data: UserEntity) => {
    try {
        console.log('data producing',data);
        await producer.connect();
        const message = [{ 
            topic: 'notification-service-topic',
            messages: [
                {
                    key: 'userCreated',
                    value: JSON.stringify(data)
                }
            ]
        }
        ];
        console.log('data message created');
        
        await producer.sendBatch({ topicMessages: message }); 
        console.log('producer sended :',message);
        
    } catch (error) {
        console.log('kafka producer error', error);
    } finally {
        await producer.disconnect();
    }
};
