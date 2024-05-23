import { producer } from ".."

export default async(
    data:{
        email:string,
        otp:string
    }
)=>{
    try {
        console.log('inside of the producer');
        
        await producer.connect()
        console.log('producer connected successfully');

        const message={
            topic:'auth-service',
            messages:[{
                key:'otp',
                value:JSON.stringify(data)
            }]
        }
        console.log('message created');
        
        producer.send(message)
        console.log('message is sended');
        
    } catch (error) {
        console.log('producer error:',error);
    }finally{
        await producer.disconnect()
    }
}