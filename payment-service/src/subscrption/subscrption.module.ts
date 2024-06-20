import { Module, forwardRef } from '@nestjs/common';
import { SubscriptionService } from './subscrption.service';
import { SubscriptionController } from './subscrption.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscription, SubscriptionSchema } from 'src/schema/Subscription.model';
import { KafkaModule } from 'src/kafka/consumer/consumer/kafka.module';

@Module({
  imports:[MongooseModule.forFeature([{name:Subscription.name,schema:SubscriptionSchema}]),forwardRef(()=>KafkaModule)],
  providers: [SubscriptionService],
  controllers: [SubscriptionController]
})
export class SubscrptionModule {}
