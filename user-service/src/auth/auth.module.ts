import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
    imports:[
        JwtModule.register({
            secret:process.env.JWT_SECRET,
            signOptions:{expiresIn:'7h'}
        })
    ],
    providers:[JwtAuthGuard,JwtService],
    exports:[JwtAuthGuard]
})
export class AuthModule {}
