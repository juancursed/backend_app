import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()

export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, 
                private configService: ConfigService, 
                private reflector: Reflector) {}

    async canActivate(context: ExecutionContext):Promise<boolean>{
        
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(), 
            context.getClass(),   
          ]);
          if (isPublic) {
            return true;  
        }
        
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('Invalid credentials');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, 
                {
                    secret: this.configService.get<string>('JWT_CONSTANT')
                })
                

            request['user'] = payload;

        } catch{
            throw new UnauthorizedException('Invalid credentials');
        }

        return true;
    }
	
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
        
}
