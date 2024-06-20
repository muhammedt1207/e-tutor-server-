import database from './_boot/config'
import { runConsumer } from './_boot/consumer';
import server from './presentation/index'
(async()=>{
    try{

    server;
    await database()
    await runConsumer()
    }catch(error){
        console.log(error);
        
    }finally{
        process.on("SIGINT",async()=>{
            console.log('server shutting down')
            process.exit()
        })
    }
})()