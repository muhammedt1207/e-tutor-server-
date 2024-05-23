import { startConsumer, stopConsumer } from './_boot/consumer';
import  server from './presentation';
(async()=>{
    try {
        server;
        await startConsumer()
        .then(()=>console.log("kafka consumer is running"))
        .catch((error:any)=>{
            process.exit(0)
        })
        
    } catch (error:any) {
        console.log('error during initialization'+ error.message);
        process.exit(1)
    }finally{
        process.on("SIGINT",async()=>{
            console.log('server shutting down');
            stopConsumer();
        })
    }
})()