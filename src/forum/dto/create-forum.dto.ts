import {IsString, IsEmail, IsBoolean, IsArray, IsOptional, IsDate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateForumDto {
    @IsString()
    createdBy: string;
    
    @IsString()
    request: string;

    @IsString()
    body: string;

    @IsString()
    @IsOptional()
    photo: string;

    @IsArray()
    responses: string[];
}