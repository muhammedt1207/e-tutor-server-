import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProducerService } from 'src/kafka/producer/producer/producer.service';
import { Payment } from 'src/schema/Payment.model';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    @InjectModel(Payment.name) private paymentRepository: Model<Payment>,
    private configService: ConfigService,
    private ProducerService:ProducerService
  ) {
    this.stripe = new Stripe(this.configService.get<string>('stripeKey'), {
      apiVersion: '2024-04-10',
    });
  }

  async createPaymentIntent(amount: number, currency: string) {
    return await this.stripe.paymentIntents.create({
      amount,
      currency: 'inr',
      payment_method_types: ['card'],
    });
  }

  async createSession(data: { courseName: string; courseThumbnail: string; amount: number; userId: string; courseId: string }) {
    return await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: data.courseName,
              images: [data.courseThumbnail],
            },
            unit_amount: data.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5173/course/paymentSuccess',
      cancel_url: 'http://localhost:5173/course/paymentSuccess',
      metadata: {
        userId: data.userId,
        courseId: data.courseId,
      },
    });
  }

  async findExistingPayment(courseId: string, userId: string, amount: number): Promise<Payment> {
    return this.paymentRepository.findOne({ where: { courseId, userId, amount, confirmed: false } });
  }

  async savePayment(paymentData: any): Promise<Payment> {
    try {
        console.log(paymentData,'payment data');
        const data={
            userId:paymentData.userId,
            courseId:paymentData.courseId,
            sessionId:paymentData?.sessionId,
            status:"completed",
            amount:paymentData.amount/100
        }
        console.log(data,'------------------');
        
        const payment = await this.paymentRepository.create(data);
        console.log(payment,'created success fully');
        await this.ProducerService.sendMessage('course-service','createEnrollment',{userId:data.userId,courseId:data.courseId})

        return await payment.save();
    } catch (error) {
        throw new Error("can't save payment"+error);
        
    }
  }
}
