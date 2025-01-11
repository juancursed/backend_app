import { Body, Controller, Post, HttpCode, HttpStatus  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './authDto.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    sigin(@Body() signInDto : AuthDto){
        return this.authService.sigIn(signInDto.email, signInDto.password);
    }


}
