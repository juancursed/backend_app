import {IsString, IsEmail, IsBoolean, IsArray, IsOptional, IsDate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateForumDto {
    @IsString()
    request: string;

    @IsString()
    body: string;

    @IsString()
    photo: string;

    @IsArray()
    responses: string[];
}