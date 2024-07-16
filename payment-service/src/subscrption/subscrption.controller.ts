import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import Stripe from 'stripe';
import { SubscriptionService } from './subscrption.service';
@Controller('subscription')
export class SubscriptionController {
  private stripe: Stripe;

  constructor(
    private readonly SubscrptionService: SubscriptionService,
  ) {
    this.stripe = new Stripe('sk_test_51PHmWaSCFxhihy8I39LbTd6ctooCf3cQqSet0RaZ7SRzndZQJE6GSEr0wXOPktGCuXiXyWu9HlNcAEx65ilCYc8b00hEcto1k4', {
      apiVersion: '2024-04-10',
    });
  }

  @Get('/:userId')
  async getSubscriptionByUserId(@Param() userId:any, @Res() res){
    try {
      console.log('user id :',userId?.userId);  
      console.log(typeof userId,'user id type ');
          

      const result = await this.SubscrptionService.getSubscriptions(userId?.userId)
      if (!result) {
        throw new Error("can't find the Subscriptio");
      }
      console.log(result);
      
      res.status(HttpStatus.OK).json({
        success: true,
        data: result,
        message: 'subscription data'
      })

    } catch (error) {
      throw new Error(error);
    }
  }
  @Get('/:userId/:instructorId')
  async getSubscriptionData(@Param() userId: any, @Res() res) {
    try {

      console.log("user Id :", userId.userId);
      console.log('instructor id:', userId.instructorId);

      const result = await this.SubscrptionService.getSubscription(userId.userId, userId.instructorId)
      if (!result) {
        throw new Error("can't find the Subscriptio");

      }
      res.status(HttpStatus.OK).json({
        success: true,
        data: result,
        message: 'subscription data'
      })

    } catch (error) {
      throw new Error(error);
    }
  }


  @Post('create-checkout-session')
  async createCheckoutSession(
    @Body() data: { email: string; instructorId: string },
  ) {
    const session = await this.SubscrptionService.createSession(data.email, data.instructorId);
    return {
      id: session.id,
    };
  }

  @Post('webhook')
  async handleWebhook(@Body() payload: any, @Req() req, @Res() res: Response) {
    const sig = req.headers['stripe-signature'];
    let event;
    console.log(payload, 'payload data');

    try {
      event = this.stripe.webhooks.constructEvent(
        payload,
        sig,
        '******************************************',
      );
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    switch (event.type) {
      case 'customer.subscription.created':
        const subscription = event.data.object;
        const userId = subscription.customer;
        const instructorId = subscription.metadata.instructorId;

        const data = {
          userId, instructorId, subscription
        }
        // await this.SubscrptionService.saveSubscription(data);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  }

  @Post('save')
  async saveSubscriptions(@Body() subscriptionData: any, @Res() res) {
    try {

      console.log(subscriptionData, 'subscription is saving ................');

      const savedData = await this.SubscrptionService.saveSubscription(subscriptionData);
      res.status(HttpStatus.OK).json({
        success: true,
        data: savedData,
        message: "payment data saved"
      })
    } catch (error) {
      console.log(error);
      throw new Error(error);


    }
  }
}