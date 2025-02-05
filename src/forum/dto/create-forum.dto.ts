import {IsString, IsEmail, IsBoolean, IsArray, IsOptional, IsDate, ValidateNested } from 'class-validator';


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

    @IsDate()
    date: Date;
}