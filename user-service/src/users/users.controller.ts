import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { log } from 'console';

@Controller()
export class UsersController {
    constructor( 
        private readonly usersService:UsersService
       ){}

    @Get('/instructor')
    async instructors(@Req() req:Request, @Res() res:Response){
        try {
            console.log('in get all instructors');
            
            const data=await this.usersService.getAllInstructorsApplications()
            console.log('instructors data', data);
            
            res.status(HttpStatus.OK).json({
                success:true,
                data:data,
                message:'Applied successfully'
            })
        } catch (error) {
            throw new HttpException('Failed to get instructor', HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @Get('/acceptedInstructor')
    async getAcceptedInstructers(@Req() req:Request,@Res() res:Response){
        try {
            const data= await this.usersService.getAcceptedInstructors()
            res.status(HttpStatus.OK).json({
                success:true,
                data:data,
                message:'instructor data'
            })
        } catch (error) {
            
        }
    }

    @Get('/instructor/:id')
    async getInstructorById(@Param('id') id: string) {
        try {
            return await this.usersService.getInstructorById(id);
        } catch (error) {
            throw new HttpException('Failed to fetch instructor application', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('/instructor/:id/:status')
    async acceptInstructor(
        @Param('id') id: string,
        @Param('status') status: string, 
        @Req() req: Request,
        @Res() res: Response
    ) {
        try {
            console.log('Accepting instructor data...');
            console.log('ID:', id);
            console.log('Status:', status);
            
            const result = await this.usersService.acceptRequest(id, status); 
    
            res.status(HttpStatus.OK).json({
                success: true,
                data: result,
                message: 'Accepted successfully'
            });
        } catch (error) {
            // Handle errors here
            console.error('Error accepting instructor:', error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                error: 'Internal Server Error'
            });
        }
    }
    
    @Post('/instructor/apply')
    @UseGuards(JwtAuthGuard)
    async addInstructorApplication(@Body() instructorData:any, @Req() req:Request, @Res() res:Response){
        try {
            console.log(instructorData,'🅱🅾');
            console.log(req.user);
            
            const userId = req.user.email; 

            const result = await this.usersService.addInstructorApplication(instructorData, userId);
            console.log(result,'**********************');
            
            if (!result) {
                throw new HttpException('Failed to add instructor', HttpStatus.INTERNAL_SERVER_ERROR);
            }
            res.status(HttpStatus.OK).json({
                success:true,
                data:result,
                message:'Applied successfully'
            })
        } catch (error) {
            throw new HttpException('Failed to add instructor', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/user/:email')
    async getUserByEmail(@Param('email') email: string,@Res() res:Response) {
        try {
            console.log(email);
            
            const user = await this.usersService.getInstructorByEmail(email);
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            console.log(user);
            
            res.status(HttpStatus.OK).json({
                success:true,
                data:user,
                message:'Applied successfully'
            })
        } catch (error) {
            throw new HttpException('Failed to fetch user by email', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
