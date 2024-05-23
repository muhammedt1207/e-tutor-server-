import { Module, forwardRef } from '@nestjs/common';
import { StripeService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSchema } from 'src/schema/Session.schema';
import configuration from '../config/config'
import { PaymentSchema } from 'src/schema/Payment.model';
import { KafkaModule } from 'src/kafka/consumer/consumer/kafka.module';

@Module({
  imports: [
    forwardRef(()=>KafkaModule),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    MongooseModule.forFeature([{ name: 'Session', schema: SessionSchema }]),
    MongooseModule.forFeature([{name:'Payment', schema:PaymentSchema}])
  ],
  providers: [StripeService],
  controllers: [PaymentController],
})
export class PaymentModule {}