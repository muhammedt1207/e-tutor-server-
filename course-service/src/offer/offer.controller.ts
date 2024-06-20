import { Body, Controller, HttpStatus, Param, Patch, Res } from '@nestjs/common';
import { OfferService } from './offer.service';
import { Offer } from 'src/schema/offer.model';

@Controller('offer')
export class OfferController {
    constructor(private readonly offerService:OfferService){}

    @Patch(':courseId')
    async addOrUpdateOffer(@Param("courseId") courseId:string,@Body() offerDatails:any, @Res() res){
        try {
            console.log('Offer Datas :',offerDatails);
            const result=await this.offerService.addOrUpdateOffer(courseId,offerDatails)
            console.log(result);
            
            res.status(HttpStatus.OK).json({
                success:true,
                data:result,
            })
        } catch (error) {
            console.log(error);
            throw new Error(error);
            
        }
    }
}
