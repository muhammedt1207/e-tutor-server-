import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Stripe from 'stripe';
import { Subscription } from 'src/schema/Subscription.model'; 
import { ProducerService } from 'src/kafka/producer/producer/producer.service';

@Injectable()
export class SubscriptionService {
  private stripe: Stripe;

  constructor(
    @InjectModel(Subscription.name) private subscriptionRepository: Model<Subscription>,
    private ProducerService:ProducerService
  ) {
    this.stripe = new Stripe('sk_test_51PHmWaSCFxhihy8I39LbTd6ctooCf3cQqSet0RaZ7SRzndZQJE6GSEr0wXOPktGCuXiXyWu9HlNcAEx65ilCYc8b00hEcto1k4', {
      apiVersion: '2024-04-10',
    });
  }

  async createSession(email: string, instructorId: string) {
    const priceId = await this.createPrice();

    const customer = await this.stripe.customers.create({
      email,
      metadata: {
        instructorId,
      },
    });

    const subscription = await this.stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: priceId,
        },
      ],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        instructorId,
      },
    });

    return this.stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer: customer.id,
      success_url: 'https://gizmocart.shop/membership/paymentSuccess',
      cancel_url: 'https://gizmocart.shop/membership/paymentCancel',
      subscription_data: {
        metadata: {
          instructorId,
        },
      },
    });
  }

  async createPrice() {
    const product = await this.stripe.products.create({
      name: 'Monthly Membership',
      description: 'Monthly subscription for instructor membership',
    });

    const price = await this.stripe.prices.create({
      product: product.id,
      currency: 'inr',
      recurring: {
        interval: 'month',
      },
      unit_amount: 12900, 
    });

    return price.id;
  }

  async saveSubscription(subscriptionDatas: any) {
    console.log(subscriptionDatas);
  
    const timestamp = new Date(Date.now() + 28 * 24 * 60 * 60 * 1000); 
    const endingDate = new Date(timestamp);
  
    const existingSubscription:any = await this.subscriptionRepository.findOne({userId:subscriptionDatas.customerId, instructorId:subscriptionDatas.instructorId.teacherId});
  console.log(existingSubscription);
  
    if (!existingSubscription || (existingSubscription && existingSubscription.currentPeriodEnd < Date.now())) {
      const subscriptionData = {
        userId: subscriptionDatas.customerId,
        instructorId: subscriptionDatas.instructorId,
        status: 'Success',
        currentPeriodEnd: endingDate,
        amount: 129,
      };
      
      const newSubscription = new this.subscriptionRepository(subscriptionData);
      await this.ProducerService.sendMessage('chat-service', 'createChat',{type:'individual',participants:[subscriptionData.userId,subscriptionData.instructorId]})

      await newSubscription.save();
    } else {
      console.log('Subscription already exists or current period is not yet ended.');
    }
  }

  async getSubscription(userId:string,instructorId:string){
    try {
        const subscriptionData=await this.subscriptionRepository.findOne({userId:userId,instructorId:instructorId})
        return subscriptionData
    } catch (error) {
        throw new Error(error);
        
    }
  }
  
}