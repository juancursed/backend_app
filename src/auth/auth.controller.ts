import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator'; 
import { AuthDto } from './authDto.dto';
import { AuthGuard } from './auth.guard';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    sigin(@Body() signInDto : AuthDto){
        return this.authService.sigIn(signInDto.email, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req){
        return req.user;
    }

}
