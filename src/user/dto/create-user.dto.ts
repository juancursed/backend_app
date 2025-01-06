import { IsString, IsEmail, IsBoolean, IsArray, IsOptional, IsDate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class nameDto {
  @IsString()
  first: string;

  @IsString()
  last: string;
}

class regionDto {

    @IsString()
    country: string;
    
    @IsString()
    city: string;

}

export class CreateUserDto {
    @ValidateNested()
    @Type(() => nameDto)
    name: nameDto;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsDate()
    @Type(() => Date)
    bornDate: Date;

    @ValidateNested()
    @Type(() => regionDto)
    region: regionDto;

    @IsString()
    phone: string;

    @IsOptional()
    @IsArray()
    followers: string[];
}