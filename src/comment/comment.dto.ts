import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateCommentDto {
    
    @IsNotEmpty()
    @IsString()
    body: string;

    @IsOptional()
    @IsUrl()
    photo?: string;
}