// import { Injectable, OnModuleInit } from '@nestjs/common';
// import { Consumer, Kafka } from 'kafkajs';
// import { partition } from 'rxjs';
// import { UsersService } from 'src/users/users.service';

// @Injectable()
// export class ConsumerService implements OnModuleInit{
//     private readonly kafka=new Kafka({
//         brokers:['locahost:29093']
//     })

//     private readonly consumer:Consumer;

//     constructor(private readonly usersService:UsersService){
//         this.consumer = this.kafka.consumer({groupId:'user-service-group'})
//     }

//      async onModuleInit() {
//         await this.consumer.connect();
//         await this.consumer.subscribe({topic:'user-service-topic'})    

//         await this.consumer.connect();
//         eachMessage:async({topic,partition,message})=>{
//             const messageValue = message.value?.toString();
//             if(messageValue){
//                 try {
//                     const userData =JSON.parse(messageValue);
//                     console.log('Parsed userData:',userData);
//                     await this.usersService.addUser(userData)
                    
//                 } catch (error) {
//                     console.log('Error processing message',error);
                    
//                 }
//             }
//         }
//     }
//     async onApplicationShutdown(){
//         await this.consumer.disconnect()
// }
// }
