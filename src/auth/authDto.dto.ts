import { IsString, IsEmail, IsBoolean, IsArray, IsOptional, IsDate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AuthDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}