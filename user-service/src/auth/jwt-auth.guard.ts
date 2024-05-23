
declare global {
    namespace Express {
      interface Request {
        user?: UserPayload; 
      }
    }
  }
  
  
  import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { JwtService } from '@nestjs/jwt';
  import * as jwt from 'jsonwebtoken';
  
  interface UserPayload {
    id: string;
    username: string;
    email: string;
  }
  
  @Injectable()
  export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
  
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      console.log('inside of jwt verification guard');
      
      const request = context.switchToHttp().getRequest();
      
      const authorizationHeader = request.headers.cookie; 
      
      if (!authorizationHeader) {
          throw new UnauthorizedException('Authorization cookie is missing');
      }
  
      const token = extractTokenFromCookie(authorizationHeader);
      // console.log('token:', token);
      
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.user = decoded;
        console.log(request.user);
        
        return true;
      } catch (err) {
        console.log(err);
        
        return false;
      }
    }
  }
  
  function extractTokenFromCookie(cookieHeader: string): string | null {
    const tokenRegExp = /(?:^|;)\s*access_token=([^;]*)/;
    const tokenMatch = cookieHeader.match(tokenRegExp);
    return tokenMatch ? tokenMatch[1] : null;
  }
  