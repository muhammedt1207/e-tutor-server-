import { Module, forwardRef } from '@nestjs/common';
// import { ConsumerService } from './consumer/consumer.service';
import { UserModule } from 'src/users/users.module';
import { ProducerService } from './producer/producer.service';
import { UsersService } from 'src/users/users.service';
import { InstructorApplication } from 'src/users/schema/instructor.model';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [ ProducerService],
  exports: [ ProducerService],
})

export class KafkaModule {}