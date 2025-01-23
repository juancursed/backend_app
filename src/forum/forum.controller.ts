import { Body, Get, InternalServerErrorException, Post, Request } from '@nestjs/common';
import { Controller, Param } from '@nestjs/common';
import { CreateForumDto } from './dto/create-forum.dto';
import { ForumService } from './forum.service';

@Controller('forum')
export class ForumController {
    constructor(private readonly forumService: ForumService) {}

    @Get('forum/:id')
    async getForum(@Param('id') id: string){
        return `This action returns a #${id} forum`;
    }

    @Post('create')
    async createForum(@Body() createForumDto: CreateForumDto, @Request() req: any){
        console.log(req.user.sub);
        createForumDto.createdBy = req.user.sub;
        try {
            return this.forumService.createForum(createForumDto);
        }
        catch {
            throw new InternalServerErrorException('Error creating forum');
        }
        
    }
}

