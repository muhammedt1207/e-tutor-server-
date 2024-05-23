import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ProducerService } from 'src/kafka/producer/producer/producer.service';

@Module({
    providers: [ ProducerService],
  exports: [ ProducerService],
})
export class KafkaModule {}
