import { Controller, Post, Body, Res } from '@nestjs/common';
import { StripeService } from './payment.service';
import { create } from 'domain';


@Controller()
export class PaymentController {
  constructor(private stripeService: StripeService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(@Body() createPaymentIntentDto: { amount: number }) {
    const paymentIntent = await this.stripeService.createPaymentIntent(createPaymentIntentDto.amount, 'inr');
    return {
      clientSecret: paymentIntent.client_secret,
    };
  }

  @Post('create-session')
  async createSession(@Body() createSessionData: { courseName: string; courseThumbnail: string; amount: number; userId: string; courseId: string }) {
    console.log(createSessionData,'datas....');
    
    const session = await this.stripeService.createSession(createSessionData);
    return {
      id: session.id,
    };
  }

  @Post('savePayment')
  async savePayment(@Body() savePaymentData:any,@Res() res){
    try {
        const {
            courseId,userId,amount
        }=savePaymentData
        console.log(savePaymentData);
        const result=await this.stripeService.findExistingPayment(courseId,userId)
        console.log(result);
        
        if(result){
            res.status(400).json({
                success:false,
                message:"alredy paid this"
            })
        }

        const createdPayment=await this.stripeService.savePayment(savePaymentData)
        if(!createdPayment){
            res.status(200).json({
                success:false,
                data:{},
                message:"payment can't save"
            })
        }

        res.status(200).json({
            success:false,
            data:{createdPayment},
            message:"payment can't save"
        })
    } catch (error) {
        
    }
  }
}
