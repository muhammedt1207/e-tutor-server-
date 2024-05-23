import { producer } from ".."


export default async(data:{email:string,token:string})=>{

    try {
        await producer.connect()
        console.log('producer connected');
        const message={
            topic:'notification-service-topic',
            messages:[
                {
                    key:'forgotPassword',
                    value:JSON.stringify(data)
                }
            ]
        }
        console.log('producer sending......',message);
        
    await producer.send(message)        
    } catch (error) {
        console.log('kafka producer error :',error);
    }finally{
      await producer.disconnect()
    }
}