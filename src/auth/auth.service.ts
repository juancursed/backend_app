import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService) {}
  
    async sigIn(email: string, passwordUser: string): Promise<{ acces_token: string }> {
        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await this.userService.validatePassword(passwordUser, user.password); // Usa await aquí

        if (isPasswordValid) {
            
            const payload = { sub: user._id, email: user.email };

            return {
                acces_token: await this.jwtService.signAsync(payload)
            };

        } else {
            throw new UnauthorizedException('Invalid credentials');
        }


    }

}
