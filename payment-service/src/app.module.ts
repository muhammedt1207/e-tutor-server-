// src/app.module.ts
import { Module, OnModuleInit } from '@nestjs/common';
import { PaymentModule } from './payment/payment.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsumerService } from './kafka/consumer/consumer/consumer.service';
import { ProducerService } from './kafka/producer/producer/producer.service';
import { KafkaModule } from './kafka/consumer/consumer/kafka.module';
import { SubscrptionModule } from './subscrption/subscrption.module';
import configuration from './config/config';

@Module({
  imports: [
    PaymentModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoUri'),
      }),
      inject: [ConfigService],
    }),
    KafkaModule,
    SubscrptionModule,
  ],
  controllers: [],
  providers: [ConsumerService, ProducerService],
})
export class AppModule implements OnModuleInit {
  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const mongoUri = this.configService.get<string>('mongoUri');
    console.log('MongoDB URI:', mongoUri);

   
  }
}