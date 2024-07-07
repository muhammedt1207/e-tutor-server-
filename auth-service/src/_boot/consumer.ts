
// import { consumer } from "@/infrastructure/kafka";
import {consumer} from '../infrastructure/kafka'
import { IAuthSubsciber, createSubscriber } from "../infrastructure/kafka/subscribe";


export const runConsumer=async()=>{
    try {
        await consumer.connect()

        await consumer.subscribe({
            topic:'auth-service',
            fromBeginning:true
        })
        await consumer.subscribe({
            topic:'instructor-accepted-topic',
            fromBeginning:true
        })

        console.log('consumer connected✅✅');

        const subscribe=createSubscriber()

        await consumer.run({
            eachMessage:async({message})=>{
                console.log(message,"677777777777777777777");
                
                const {key,value}=message;
                const subscriberMethod=String(key) as keyof IAuthSubsciber;
                const subscriberData=JSON.parse(String(value))
                console.log(subscriberData,'11111111111111111111111111111111111111');
                
                try {
                    if(subscriberMethod in subscribe){
                        await subscribe[subscriberMethod](subscriberData)

                    }else{
                        throw new Error(`Method ${subscriberMethod} not found in subscriber`);                      
                    }

                } catch (error:any) {
                    console.log('error in subscriber method:',error);
                    throw new Error(error);
                    
                }
            }
        })
        
    } catch (error:any) {
        throw new Error("kafka consumer error"+error);
        
    }
}

export const stopConsumer= async()=>{
    try {
        await consumer.stop()
        await consumer.disconnect()
        console.log('consumer stopped and disconnected');
        
    } catch (error) {
        console.log('kafka stopping error',error);
        
    }
}